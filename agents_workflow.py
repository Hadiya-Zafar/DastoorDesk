import re
import json
from typing import TypedDict, List
from langgraph.graph import StateGraph, END
from langchain_ollama import OllamaLLM
from langchain_core.prompts import ChatPromptTemplate
from evidence_logic import evidence_mapper

# 1. Define the shared state between agents
class AgentState(TypedDict):
    query: str
    category: str
    context: str
    response: str
    language: str
    evidence: List[str]

class DastoorAgent:
    def __init__(self, vector_db):
        self.llm = OllamaLLM(model="llama3", temperature=0)
        self.vector_db = vector_db

    def classify_node(self, state: AgentState):
        """Node 1: Determines the legal domain."""
        print("🔍 [Node] Classifying Domain...")
        prompt = ChatPromptTemplate.from_template(
            "Classify this Pakistani legal query: {query}\n"
            "Options: Cybercrime, Property, Consumer Rights, Family Law.\n"
            "Respond with ONLY the category name."
        )
        category = self.llm.invoke(prompt.format(query=state['query'])).strip()
        return {**state, "category": category}

    def retrieve_node(self, state: AgentState):
        """Node 2: Restricted Retrieval - Only searches laws relevant to the department."""
        dept = state['category'] # e.g., 'cybercrime'
        print(f"📚 [Node] Routing search strictly to {dept} PDFs...")
        
        # We add the department name to the query to 'boost' those specific PDFs
        search_query = f"According to {dept} law in Pakistan: {state['query']}"
        
        # Retrieve 5 chunks to ensure we get a deep answer
        docs = self.vector_db.similarity_search(search_query, k=5)
        
        # Format context and include Source Names to prove it's using the PDFs
        context_list = []
        for d in docs:
            source_name = d.metadata.get('source', 'Pakistani Law')
            context_list.append(f"[FROM FILE: {source_name}]\n{d.page_content}")
            
        context = "\n\n---\n\n".join(context_list)
        
        # Professional Mapping for the Evidence Panel
        evidence = evidence_mapper.get_evidence_checklist(dept)
        
        return {**state, "context": context, "evidence": evidence}

    def reason_node(self, state: AgentState):
        """Node 3: Generates the final Pakistani legal guide."""
        print("✍️ [Node] Generating Response...")
        lang = "Urdu script (اردو)" if state['language'] == "urdu" else "English"
        
        prompt = ChatPromptTemplate.from_template(
            "You are the Dastoor Desk Legal Assistant for Pakistan. Respond in {lang}.\n"
            "STRICT: Ignore any non-Pakistani laws (e.g., IPC). Use only the provided context.\n\n"
            "DOMAIN: {category}\n"
            "LAWS: {context}\n"
            "ISSUE: {query}\n\n"
            "Structure your answer:\n"
            "1. THE LAW (Simple summary)\n"
            "2. ACTION PLAN (Steps to take)\n"
            "3. EVIDENCE CHECKLIST"
        )
        
        response = self.llm.invoke(prompt.format(
            lang=lang,
            category=state['category'],
            context=state['context'],
            query=state['query']
        ))
        return {**state, "response": response}

def create_dastoor_graph(vector_db):
    agent = DastoorAgent(vector_db)
    workflow = StateGraph(AgentState)

    workflow.add_node("classifier", agent.classify_node)
    workflow.add_node("retriever", agent.retrieve_node)
    workflow.add_node("generator", agent.reason_node)

    workflow.set_entry_point("classifier")
    workflow.add_edge("classifier", "retriever")
    workflow.add_edge("retriever", "generator")
    workflow.add_edge("generator", END)

    return workflow.compile()