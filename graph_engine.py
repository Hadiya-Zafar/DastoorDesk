from typing import TypedDict, List
from langgraph.graph import StateGraph, END
from langchain_ollama import OllamaLLM
from logger_config import logger
from evidence_logic import evidence_mapper

# Specialist Imports
from urdu_voice import generate_urdu_response
from english_voice import generate_english_response

# 1. Professional Agent State Definition
class AgentState(TypedDict):
    query: str
    category: str
    context: str
    translated_context: str
    response: str
    language: str
    evidence: List[str]

def create_dastoor_graph(vector_db, legal_tools):
    # Model for the translator step
    llm = OllamaLLM(model="llama3", temperature=0)

    # --- NODE 1: Classifier ---
    def classifier_node(state: AgentState):
        logger.info(f"[NODE] Classifier: Routing to {state.get('category')}")
        return state

    # --- NODE 2: Retriever ---
    def retriever_node(state: AgentState):
        logger.info(f"[NODE] Retriever: Fetching Law for {state['category']}")
        context = legal_tools.search_pakistani_laws(f"{state['category']} {state['query']}")
        evidence = evidence_mapper.get_evidence_checklist(state['category'])
        return {**state, "context": context, "evidence": evidence}

    # --- NODE 3: Legal Translator ---
    def translator_node(state: AgentState):
        if state['language'] == "english":
            return {**state, "translated_context": state['context']}
        
        logger.info("[NODE] Translator: English Law -> Urdu Script")
        prompt = f"Translate this Pakistani Law into professional Urdu script: {state['context']}"
        translated = llm.invoke(prompt)
        return {**state, "translated_context": translated}

    # --- NODE 4: Specialist Router (The Brain) ---
    def reasoner_node(state: AgentState):
        logger.info(f"[NODE] Router: Sending to {state['language'].upper()} Specialist")
        
        # --- FIXED: LOGIC MUST BE INSIDE THE NODE ---
        if state['language'] == "urdu":
            # Calls your urdu_voice.py
            response = generate_urdu_response(
                state['query'], 
                state['translated_context'], 
                state['category'], 
                state['evidence']
            )
        else:
            # Calls your english_voice.py
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