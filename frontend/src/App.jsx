import { useState } from "react";
import axios from "axios"

function App(){
  const [file, setFile] = useState(null)
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const [summary, setSummary] = useState("")
  const [quiz, setQuiz] = useState("")
  const [loading, setLoading] = useState(false)

  const BACKEND_URL = "http://127.0.0.1:8000"


  // Upload PDF
  const uploadPDF = async () => {
    if (!file) return

    const formData = new FormData()
    formData.append("file", file)

    try {
      setLoading(true)

      await axios.post(
        `${BACKEND_URL}/upload-pdf`,
        formData
      )

      alert("PDF uploaded successfully")
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }


  // Ask Question
  const askQuestion = async () => {
    if (!question) return

    try {
      setLoading(true)

      const response = await axios.post(
        `${BACKEND_URL}/ask`,
        {question}
      )

      setAnswer(response.data.answer)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }


  // Generate Summary
  const generateSummary = async () => {
    try {
      setLoading(true)

      const response = await axios.get(`${BACKEND_URL}/summary`)
      setSummary(response.data.summary)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }


  // Generate Quiz
  const generateQuiz = async () => {
    try {
      setLoading(true)

      const response = await axios.get(`${BACKEND_URL}/quiz`)
      setQuiz(response.data.quiz)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-5xl font-bold mb-8 text-center">
          AI Study Assistant
        </h1>


        {/* Upload PDF */}
        <div className="bg-zinc-900 p-6 rounded-2xl mb-6">
          <h2 className="text-2xl font-semibold mb-4">
            Upload PDF
          </h2>

          <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files[0])} className="mb-4" />

          <button onClick={uploadPDF} className="bg-blue-600 px-6 py-3 rounded-xl">Upload</button>
        </div>


        {/* Ask Question */}
        <div className="bg-zinc-900 p-6 rounded-2xl mb-6">
          <h2 className="text-2xl font-semiboldmb-4">
            Ask Questions
          </h2>

          <textarea
            value={question} 
            onChange={(e) => setQuestion(e.target.value)} 
            placeholder="Ask anything from the PDF"
            className="w-full p-4 rounded-xl bg-zinc-800 mb-4"
            rows={4} 
          />

          <button onClick={askQuestion} className="bg-green-600 px-6 py-3 rounded-xl">Ask AI</button>

          {answer && (
            <div className="mt-6 bg-zinc-800 p-4 rounded-xl whitespace-pre-wrap">{answer}</div>
          )}

        </div>


        {/* Summary */}
        <div className="bg-zinc-900 p-6 rounded-2xl mb-6">
          <button onClick={generateSummary} className="bg-purple-600 px-6 py-3 rounded-xl mb-4">Generate Summary</button>

          {summary && (
            <div className="bg-zinc-800 p-4 rounded-xl whitespace-pre-wrap">{summary}</div>
          )}
        </div>


        {/* Quiz */}
        <div className="bg-zinc-900 p-6 rounded-2xl mb-6">
          <button onClick={generateQuiz} className="bg-red-600 px-6 py-3 rounded-xl mb-4">Generate Quiz</button>

          {quiz && (
            <div className="bg-zinc-800 p-4 rounded-xl whitespace-pre-wrap">{quiz}</div>
          )}
        </div>


        {/* Loading */}
        {loading && (
          <div className="text-center text-xl animate-pulse">AI Thinking...</div>
        )}

      </div>

    </div>
  )

}

export default App