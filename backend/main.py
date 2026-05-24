import os
from dotenv import load_dotenv
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pypdf import PdfReader
from groq import Groq


# Load env
load_dotenv()

# Initialize app
app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Groq client
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

# Store extracted text globally
pdf_text = ""

# Home Route
@app.get("/")
def home():
    return {"message": "AI Study Assistant Backend Running"}


# upload pdf
@app.post("/upload-pdf")
async def upload_pdf(file: UploadFile = File(...)):
    global pdf_text

    file_path = f"uploads/{file.filename}"

    with open(file_path, "wb") as f:
        content = await file.read()
        f.write(content)

    # extract text from pdf
    reader = PdfReader(file_path)

    extracted_text = ""

    for page in reader.pages:
        extracted_text += page.extract_text()

    pdf_text = extracted_text

    return {
        "message": "PDF uploaded successfully",
        "characters": len(pdf_text)
    }


# Ask question
@app.post("/ask")
async def ask_question(data: dict):
    question = data.get("question")

    if not pdf_text:
        return {"answer": "Please upload a PDF first."}
    
    prompt = f"""
    You are an AI study assistant.

    Answer the question using ONLY the provided study material.

    STUDY MATERIAL:
    {pdf_text[:12000]}

    QUESTION:
    {question}
    """

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "system",
                "content": "You are a helpful AI study assistant."
            },
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature = 0.5,
    )

    answer = response.choices[0].message.content

    return {"answer": answer}


# Generate Summary
@app.get("/summary")
def generate_summary():
    if not pdf_text:
        return {"summary": "Please upload a PDF first."}
    
    prompt = f"""
    Summarize the following study material clearly.

    STUDY MATERIAL:
    {pdf_text[:12000]}
    """

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature = 0.4,
    )

    summary = response.choices[0].message.content

    return {"summary": summary}


# Generate Quiz
@app.get("/quiz")
def generate_quiz():
    if not pdf_text:
        return {"quiz": "Please upload a PDF first."}
    
    prompt = f"""
    Create 5 quiz questions from the study material.

    STUDY MATERIAL:
    {pdf_text[:12000]}
    """

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature = 0.7,
    )

    quiz = response.choices[0].message.content

    return {"quiz": quiz}