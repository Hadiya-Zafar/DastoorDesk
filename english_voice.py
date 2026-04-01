from langchain_ollama import OllamaLLM

llm = OllamaLLM(model="gemma3:1b", temperature=0)

def generate_english_response(query, context, category, evidence):
    legal_focus = ""
    if "cybercrime" in category.lower():
        legal_focus = "Focus on PECA 2016: Sections 13, 14, and 16."

    prompt = f"""You are the Dastoor Desk Legal Expert. Respond strictly in English.
    
    LEGAL FOCUS: {legal_focus}
    LAW CONTEXT: {context}
    USER QUERY: {query}
    
    Structure:
    ### Legal Framework
    * Statute: [Act Name]
    * Sections: [Section Numbers]
    * Summary: [Explanation]

    ###  Action Plan
    [3 steps]

    ###  Evidence Checklist
    {evidence}
    """
    return llm.invoke(prompt)