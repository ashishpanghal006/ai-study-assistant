# AI Study Assistant

An AI-powered study assistant that allows users to upload PDF notes and interact with them using AI.

Users can:
- Upload study PDFs
- Ask questions from the uploaded notes
- Generate summaries
- Create quizzes automatically

Built using FastAPI, React, and Groq API.

---

# Features

- PDF Upload
- AI Question Answering
- AI-generated Summary
- Quiz Generation
- Modern React UI
- FastAPI Backend
- Groq LLM Integration

---

# Tech Stack

## Frontend
- React
- Axios
- Tailwind CSS

## Backend
- FastAPI
- Python
- Groq API
- PyPDF

---

# Project Structure

```bash
ai-study-assistant/
│
├── backend/
│   ├── main.py
│   ├── .env
│   ├── requirements.txt
│   └── uploads/
│
├── frontend/
│   ├── src/
│   │   └── App.jsx
│   └── package.json
│
├── README.md
└── .gitignore
```

---

# Installation

## 1. Clone Repository

```bash
git clone https://github.com/ashishpanghal006/ai-study-assistant.git
cd ai-study-assistant
```

---

# Backend Setup

## Go to backend folder

```bash
cd backend
```

## Create Virtual Environment

### Windows

```bash
python -m venv venv
venv\Scripts\activate
```

### Mac/Linux

```bash
python3 -m venv venv
source venv/bin/activate
```

---

## Install Dependencies

```bash
pip install fastapi uvicorn python-multipart pypdf python-dotenv groq
```

---

## Create `.env`

```env
GROQ_API_KEY=your_groq_api_key
```

---

## Run Backend

```bash
uvicorn main:app --reload
```

Backend runs on:

```bash
http://127.0.0.1:8000
```

---

# Frontend Setup

## Open frontend folder

```bash
cd frontend
```

## Install Dependencies

```bash
npm install
```

## Run Frontend

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# API Endpoints

## Upload PDF

```http
POST /upload-pdf
```

---

## Ask Question

```http
POST /ask
```

Body:

```json
{
  "question": "What is normalization?"
}
```

---

## Generate Summary

```http
GET /summary
```

---

## Generate Quiz

```http
GET /quiz
```

---

# How It Works

1. User uploads a PDF
2. Backend extracts text using PyPDF
3. Text is sent to Groq LLM
4. AI generates:
   - Answers
   - Summaries
   - Quiz Questions

---

# Author

Ashish Panghal

---

# License

This project is open-source and available under the MIT License.