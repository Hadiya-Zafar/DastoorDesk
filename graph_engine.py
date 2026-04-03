from typing import TypedDict, List
from langgraph.graph import StateGraph, END
from langchain_ollama import OllamaLLM
from logger_config import logger
from evidence_logic import evidence_mapper

# Specialist Imports
from urdu_voice import generate_urdu_response
from english_voice import generate_english_response

class AgentState(TypedDict):
    query: str
    category: str
    context: str
    translated_context: str
    response: str
    language: str
    evidence: List[str]

def create_dastoor_graph(vector_db, legal_tools):
    llm = OllamaLLM(model="llama3", temperature=0)

    def classifier_node(state: AgentState):
        # Auto-detect language if not already set by main.py
        is_urdu = any('\u0600' <= c <= '\u06FF' for c in state['query'])
        detected_lang = "urdu" if is_urdu else "english"
        
        logger.info(f"[NODE] Classifier: Detected {detected_lang}")
        return {**state, "language": detected_lang}

    def retriever_node(state: AgentState):
        logger.info(f"[NODE] Retriever: Fetching Law for {state['category']}")
        context = legal_tools.search_pakistani_laws(f"{state['category']} {state['query']}")
        evidence = evidence_mapper.get_evidence_checklist(state['category'])
        return {**state, "context": context, "evidence": evidence}

    def translator_node(state: AgentState):
        # If user asked in English, don't waste time translating the legal context
        if state['language'] == "english":
            return {**state, "translated_context": state['context']}
        
        # Translate English law context to Urdu so the Urdu specialist has Urdu material to work with
        logger.info("[NODE] Translator: Translating English Context to Urdu Script")
        prompt = f"Translate the following Pakistani legal clauses into professional Urdu script (اردو): {state['context']}"
        translated = llm.invoke(prompt)
        return {**state, "translated_context": translated}

    def reasoner_node(state: AgentState):
        logger.info(f"[NODE] Router: Calling {state['language'].upper()} Specialist")
        
        if state['language'] == "urdu":
            # Pass the TRANSLATED context to the Urdu response generator
            response = generate_urdu_response(
                state['query'], 
                state['translated_context'], 
                state['category'], 
                state['evidence']
            )
        else:
            response = generate_english_response(
                state['query'], 
                state['context'], 
                state['category'], 
                state['evidence']
            )
            
        return {**state, "response": response}

    # --- BUILD WORKFLOW ---
    workflow = StateGraph(AgentState)
    workflow.add_node("classifier", classifier_node)
    workflow.add_node("retriever", retriever_node)
    workflow.add_node("translator", translator_node)
    workflow.add_node("reasoner", reasoner_node)

    workflow.set_entry_point("classifier")
    workflow.add_edge("classifier", "retriever")
    workflow.add_edge("retriever", "translator")
    workflow.add_edge("translator", "reasoner")
    workflow.add_edge("reasoner", END)

    return workflow.compile()