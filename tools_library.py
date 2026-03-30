from logger_config import logger

class LegalTools:
    def __init__(self, vector_db):
        self.vector_db = vector_db

    def search_pakistani_laws(self, query: str):
        """Professional tool to search the 1,983 legal chunks."""
        logger.info(f"[TOOL CALL] Searching database for -> {query[:50]}...")
        
        # Retrieve top 5 matches
        docs = self.vector_db.similarity_search(query, k=5)
        
        context = ""
        for d in docs:
            source = d.metadata.get('source', 'Pakistani Law PDF')
            context += f"\n[SOURCE: {source}]\n{d.page_content}\n---"
        return context