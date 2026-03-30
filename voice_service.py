import whisper
import os
from logger_config import logger

class VoiceService:
    def __init__(self):
        logger.info("[VOICE] Loading Whisper AI Model (Base)...")
        # 'base' is fast and good for Urdu. Use 'small' if you want even higher accuracy.
        self.model = whisper.load_model("base")

    def transcribe_audio(self, file_path: str) -> str:
        """Converts audio file to text (supports Urdu/English)."""
        try:
            logger.info(f"[VOICE] Transcribing file: {file_path}")
            result = self.model.transcribe(file_path)
            text = result['text'].strip()
            logger.info(f"[VOICE] Transcription Success: {text[:50]}...")
            return text
        except Exception as e:
            logger.error(f"[VOICE] Transcription Error: {e}")
            return ""

voice_service = VoiceService()