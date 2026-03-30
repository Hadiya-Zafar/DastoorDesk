import os
# --- UPDATED 2026 IMPORTS ---
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_chroma import Chroma
from langchain_ollama import OllamaLLM
from langchain_classic.chains import RetrievalQA

# 1. Load the exact same embedding model
embedding_model = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

# 2. Fix the DB Path
# Since your terminal is in the 'backend' folder, we need to go UP 
# one level to find 'dastoor_db' in the main folder.
db_path = "../dastoor_db" 

if not os.path.exists(db_path):
    # If it's NOT in the parent folder, check the current folder
    db_path = "./dastoor_db"

vector_db = Chroma(
    persist_directory=db_path,
    embedding_function=embedding_model
)

# 3. Setup Retriever (Top 3 legal chunks)
retriever = vector_db.as_retriever(search_kwargs={"k": 3})

# 4. Connect to Ollama (Make sure Ollama is running in your taskbar!)
llm = OllamaLLM(model="llama3")

# 5. Build the AI Question-Answering Chain
qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    chain_type="stuff",
    retriever=retriever
)

print("⚖️ Dastoor Desk is LIVE! Ask your legal question.")
print("(Type 'exit' to quit)\n")

while True:
    query = input("❓ Your Question: ")
    
    if query.lower() in ["exit", "quit"]:
        break

    # Using 'invoke' which is the modern standard over 'run'
    response = qa_chain.invoke(query)
    print("\n📜 Dastoor Desk Answer:", response['result'], "\n")