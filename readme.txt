first install 

pip install pandas pymupdf langchain-huggingface sentence-transformers langchain-chroma langchain-text-splitters

pip install pymupdf langchain pandas langchain-text-splitters
pip install pandas chromadb langchain-huggingface sentence-transformers langchain-core
python -m pip install langchain-chroma
pip install langchain-community chromadb
pip install langgraph
ollama pull llama3

conda activate dastoor_env

uvicorn main:app --reload

frontend:
cd frontend
npm install
npm run dev
(cd..)to go back from frontend

voice libs:
pip install openai-whisper pydub python-multipart
pip install -U openai-whisper
conda install -c conda-forge ffmpeg
(if error)
conda install libglib=2.78.4=*_0 gdk-pixbuf -c conda-forge --force-reinstall