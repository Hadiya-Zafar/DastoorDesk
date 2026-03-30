from langchain_ollama import OllamaLLM
from langchain_core.prompts import ChatPromptTemplate
from logger_config import logger

class TranslatorService:
    def _init_(self):
        # Use Gemma 3 1b for high-speed routing
        self.llm = OllamaLLM(model="gemma3:1b", temperature=0)
        
        self.detect_prompt = ChatPromptTemplate.from_template(
            "Task: Identify if the text is English or Urdu (Script/Roman).\n"
            "Rules: Respond with ONLY the word 'english' or 'urdu'. No punctuation.\n"
            "Text: {text}"
        )
        self.detect_chain = self.detect_prompt | self.llm

    def detect_language(self, text: str) -> str:
        try:
            # We force it to be a clean, lowercase string
            res = self.detect_chain.invoke({"text": text}).strip().lower()
            detected = "urdu" if "urdu" in res else "english"
            logger.info(f"[ROUTER] Verified Language: {detected.upper()}")
            return detected
        except Exception:
            return "english"

translator = TranslatorService()