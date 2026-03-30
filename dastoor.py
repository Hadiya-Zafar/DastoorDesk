import os
import shutil
import fitz  # PyMuPDF
import pandas as pd
from langchain_text_splitters import RecursiveCharacterTextSplitter

# --- CONFIGURATION ---
# Since your PDFs are in the same folder as this script, we use "."
SOURCE_DIR = "."               
BASE_DATA_DIR = "./dastoor_pdfs" 
OUTPUT_CSV = "dastoor_desk_dataset.csv"

# Updated with exact filenames from your screenshot
file_categorization = {
    "ConsumerProtection": [
        "the_punjab_consumer_protection_act_2005-pdf.pdf",
        "Sindh Consumer Protection Act, 2014.pdf",
        "ConsumersProtectionAct2003.doc-2.pdf",
        "ISLAMABAD CONSUMERS PROTECTION ACT.pdf", # Added the space before .pdf
        "THE KPK Consumer Protection Law.pdf"
    ],
    "FIA": [
        "THE FEDERAL INVESTIGATION AGENCY ACT.pdf",
        "THE FEDERAL INVESTIGATION AGENCY.pdf"
    ],
    "Constitution": [
        "THE CONSTITUTION OF THE ISLAMIC REPUBLIC OF.pdf"
    ],
    "NHSO": [
        "NHSO-PDF-VERSION-BOOK.pdf",
        "NHSO-PDF-VERSION-BOOK (1).pdf"
    ],
    "Highways": [
        "National-HIghways-Motorways-Dimension-of-Goods-Transport-Vehicle-Rules-2017 (1).pdf",
        "National-HIghways-Motorways-Dimension-of-Goods-Transport-Vehicle-Rules-2017.pdf"
    ],
    "DLARules": [
        "DLA-Rules-2014-with-amendmetns-PDF-Version-1 (1).pdf",
        "DLA-Rules-2014-with-amendmetns-PDF-Version-1.pdf"
    ],
    "PPC": [
        "THE PAKISTAN PENAL CODE.pdf"
    ],
    "PECA": [
        "THE PREVENTION OF ELECTRONIC CRIMES ACT.pdf"
    ]
}

# --- PART 1: ORGANIZE FILES ---
def organize_files():
    print("📂 Organizing files into categories...")
    if not os.path.exists(BASE_DATA_DIR):
        os.makedirs(BASE_DATA_DIR)

    for category, files in file_categorization.items():
        category_path = os.path.join(BASE_DATA_DIR, category)
        os.makedirs(category_path, exist_ok=True)
        
        for file_name in files:
            source_path = os.path.join(SOURCE_DIR, file_name)
            destination_path = os.path.join(category_path, file_name)
            
            if os.path.exists(source_path):
                shutil.move(source_path, destination_path)
                print(f"✅ Moved: {file_name} -> {category}")
            # If it's already in the destination, we don't need to do anything
            elif os.path.exists(destination_path):
                pass 
            else:
                print(f"❌ Missing: '{file_name}' not found.")

# --- PART 2: PREPROCESS DOCUMENTS ---
def preprocess_legal_documents(base_path):
    print("\n📝 Starting text extraction and chunking...")
    all_chunks = []
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=150,
        separators=["\n\n", "\n", " ", ""]
    )

    for category in os.listdir(base_path):
        category_path = os.path.join(base_path, category)
        if os.path.isdir(category_path):
            print(f"🔍 Processing Category: {category}")
            for file_name in os.listdir(category_path):
                if file_name.lower().endswith(".pdf"):
                    file_path = os.path.join(category_path, file_name)
                    try:
                        doc = fitz.open(file_path)
                        full_text = "".join(page.get_text() for page in doc)
                        doc.close()

                        clean_text = " ".join(full_text.split())
                        chunks = text_splitter.split_text(clean_text)

                        for i, chunk in enumerate(chunks):
                            all_chunks.append({
                                "law_category": category,
                                "source_file": file_name,
                                "chunk_id": i,
                                "text": chunk
                            })
                    except Exception as e:
                        print(f"❗ Error reading {file_name}: {e}")
    return all_chunks

# --- EXECUTION ---
if __name__ == "__main__":
    organize_files()
    processed_data = preprocess_legal_documents(BASE_DATA_DIR)
    
    if processed_data:
        df = pd.DataFrame(processed_data)
        df.to_csv(OUTPUT_CSV, index=False)
        print(f"\n🚀 Success! Dataset created with {len(df)} chunks.")
    else:
        print("\n⚠️ No data was processed. Check your filenames in the script.")