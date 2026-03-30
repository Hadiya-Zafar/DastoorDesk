import os
import pandas as pd
from langchain_huggingface import HuggingFaceEmbeddings # Updated import
from langchain_chroma import Chroma                 # Modern partner package
from langchain_core.documents import Document

def create_vector_db():
    # 1. Path Check: Ensure the file is where we expect it
    csv_file = "dastoor_desk_dataset.csv"
    if not os.path.exists(csv_file):
        print(f"❌ Error: {csv_file} not found in {os.getcwd()}")
        return

    print("🚀 Loading processed chunks...")
    df = pd.read_csv(csv_file)

    # 2. Convert CSV rows → LangChain Documents
    documents = []
    for _, row in df.iterrows():
        doc = Document(
            page_content=str(row['text']),
            metadata={
                "category": row['law_category'],
                "source": row['source_file']
            }
        )
        documents.append(doc)

    print(f"🧠 Creating local embeddings for {len(documents)} chunks...")

    # 3. LOCAL embedding model (FREE)
    # This downloads the model to your PC once
    embedding_model = HuggingFaceEmbeddings(
        model_name="sentence-transformers/all-MiniLM-L6-v2"
    )

    # 4. Create vector DB
    # This creates a folder named 'dastoor_db' in your project
    vector_db = Chroma.from_documents(
        documents=documents,
        embedding=embedding_model,
        persist_directory="./dastoor_db"
    )

    print("✅ Vector DB created locally at ./dastoor_db")

if __name__ == "__main__":
    create_vector_db()