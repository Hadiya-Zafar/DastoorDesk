import uvicorn
import shutil
import os  # Added missing import
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from enum import Enum
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_chroma import Chroma

# Local Modular Imports
from logger_config import logger
from tools_library import LegalTools
from graph_engine import create_dastoor_graph
from translator_service import translator
from voice_service import voice_service

# 1. Initialize FastAPI with metadata
app = FastAPI(
    title="Dastoor Desk Enterprise API",
    description="Professional Agentic Legal System for Pakistan",
    version="1.0.0"
)

# 2. CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. Professional Department Dropdown
class LegalSector(str, Enum):
    PROPERTY = "property"
    CYBERCRIME = "cybercrime"
    TRAFFIC = "traffic"
    CONSUMER = "consumer"
    FAMILY = "family"
    LABOUR = "labour"
    CRIMINAL = "criminal"
    CONSTITUTIONAL = "constitutional"

class UserQuery(BaseModel):
    question: str
    department: LegalSector

# 4. Component Initialization
logger.info("[STARTUP] Dastoor Desk Intelligence initializing...")
embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
vector_db = Chroma(persist_directory="./dastoor_db", embedding_function=embeddings)

legal_tools = LegalTools(vector_db)
dastoor_brain = create_dastoor_graph(vector_db, legal_tools)

# --- ROUTES ---

@app.get("/", tags=["Home"])
async def home():
    return {
        "status": "Dastoor Desk is working!",
        "message": "The Agentic Legal System is Online.",
        "api_docs": "http://127.0.0.1:8000/docs"
    }

@app.post("/ask", tags=["Core Engine"])
async def ask_legal_bot(query: UserQuery):
    """Handles text-based queries."""
    try:
        lang = translator.detect_language(query.question)
        inputs = {"query": query.question, "language": lang, "category": query.department.value}
        result = dastoor_brain.invoke(inputs)
        return {
            "answer": result["response"],
            "domain": result["category"],
            "evidence_list": result["evidence"],
            "status": "success"
        }
    except Exception as e:
        logger.error(f"[SYSTEM ERROR] {str(e)}")
        return {"answer": "Error processing text request.", "status": "error"}

@app.post("/ask-voice", tags=["Core Engine"])
async def ask_legal_bot_voice(department: LegalSector, audio: UploadFile = File(...)):
    """Receives audio, transcribes it, and runs the Legal Brain."""
    temp_path = f"temp_{audio.filename}"
    try:
        # 1. Save the incoming audio temporarily
        with open(temp_path, "wb") as buffer:
            shutil.copyfileobj(audio.file, buffer)
        
        # 2. Convert Audio to Text (Whisper)
        transcribed_text = voice_service.transcribe_audio(temp_path)
        
        # 3. Clean up the temp file
        if os.path.exists(temp_path):
            os.remove(temp_path)
            
        if not transcribed_text:
            return {"answer": "Could not understand audio.", "status": "error"}

        # 4. Route to Agentic Brain
        lang = translator.detect_language(transcribed_text)
        inputs = {
            "query": transcribed_text, 
            "language": lang, 
            "category": department.value
        }
        result = dastoor_brain.invoke(inputs)
        
        return {
            "transcribed_query": transcribed_text,
            "answer": result["response"],
            "evidence_list": result["evidence"],
            "status": "success"
        }
    except Exception as e:
        logger.error(f"[SYSTEM ERROR] {str(e)}")
        # Clean up if error happens during processing
        if os.path.exists(temp_path):
            os.remove(temp_path)
        return {"answer": "Error processing voice request.", "status": "error"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)