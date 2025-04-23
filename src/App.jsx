import { useState } from 'react';

export default function SkillBridgeAI() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!query) return;
    setLoading(true);
    const res = await fetch('https://skillbridge-backend.onrender.com/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    });
    const data = await res.json();
    setResponse(data.answer);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#fefefe] flex flex-col items-center justify-start px-4 py-8 font-sans text-gray-800">
      <div className="w-full max-w-2xl space-y-6">
        <header className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">S</div>
            <h1 className="text-3xl font-bold tracking-tight">SkillBridge AI</h1>
          </div>
          <p className="text-sm text-gray-500 italic">
            Bridging humans and future skills. <strong>One</strong> query at a time.
          </p>
        </header>

        <div className="p-4 border rounded-lg bg-white shadow-sm">
          <p className="text-sm font-semibold text-gray-600 mb-1">💡 TIP OF THE DAY</p>
          <p className="text-gray-700">Try asking what certifications are trending in AI finance</p>
        </div>

        {query && (
          <div className="p-4 rounded-lg bg-[#1e1e1e] text-white shadow-inner">
            <p className="text-sm">🎙️ {query}</p>
          </div>
        )}

        {loading ? (
          <p className="text-center text-gray-400">Thinking...</p>
        ) : (
          response && (
            <div className="p-4 rounded-lg bg-[#2d2d2d] text-white">
              <p className="text-sm leading-relaxed">{response}</p>
              <div className="flex gap-2 mt-3">
                <button className="text-sm px-3 py-1 border rounded bg-white text-black">📋 Copy</button>
                <button className="text-sm px-3 py-1 border rounded text-white hover:text-green-400">👍</button>
                <button className="text-sm px-3 py-1 border rounded text-white hover:text-red-400">👎</button>
              </div>
            </div>
          )
        )}

        <div className="flex gap-2 mt-4">
          <input
            type="text"
            placeholder="Enter your question"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-grow border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleAsk}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Ask AI
          </button>
        </div>
      </div>
    </div>
  );
}
