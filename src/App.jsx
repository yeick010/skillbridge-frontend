import { useState } from 'react';

export default function App() {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    setLoading(true);
    const res = await fetch("https://skillbridge-backend.onrender.com/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });
    const data = await res.json();
    setAnswer(data.answer);
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">SkillBridge AI</h1>
      <textarea
        className="w-full border p-2 rounded mb-2"
        rows={4}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Es. Quali skill servono per diventare data scientist?"
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        onClick={askAI}
        disabled={loading}
      >
        {loading ? "Generazione in corso..." : "Chiedi a SkillBridge AI"}
      </button>
      {answer && (
        <div className="mt-4 p-4 border rounded bg-gray-50 whitespace-pre-line">
          {answer}
        </div>
      )}
    </div>
  );
}
