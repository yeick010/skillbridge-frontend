import { useState } from 'react';

export default function App() {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setAnswer("");
    try {
      const res = await fetch("https://skillbridge-backend.onrender.com/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query })
      });
      const data = await res.json();
      setAnswer(data.answer);
    } catch (err) {
      setAnswer("⚠️ Errore nella risposta AI. Riprova.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(answer);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-2">SkillBridge AI</h1>
      <p className="text-gray-600 mb-6">Bridging humans and future skills. One query at a time.</p>

      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded mb-4 max-w-xl w-full">
        💡 <strong>Tip:</strong> Try asking what certifications are trending in AI finance
      </div>

      <div className="max-w-xl w-full">
        <textarea
          className="w-full p-3 border rounded mb-3"
          rows="3"
          placeholder="What skills should I develop for AI in finance?"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        ></textarea>
        <button
          onClick={askAI}
          disabled={loading}
          className="bg-blue-600 text-white py-2 px-4 rounded w-full hover:bg-blue-700"
        >
          {loading ? "Generating..." : "Ask AI"}
        </button>

        {answer && (
          <div className="bg-white p-4 mt-4 rounded shadow border">
            <p className="whitespace-pre-line text-gray-800 mb-2">{answer}</p>
            <div className="flex gap-3">
              <button onClick={copyToClipboard} className="text-sm bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded">📋 Copy</button>
              <button className="text-sm bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded">👍</button>
              <button className="text-sm bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded">👎</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
