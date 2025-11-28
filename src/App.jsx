import React, { useState } from "react";

const API_BASE_URL = "https://corazon-nonportrayable-domically.ngrok-free.dev"; // Replace with your backend ngrok URL

function App() {
  const [message, setMessage] = useState("");
  const [tone, setTone] = useState("Flirty");
  const [language, setLanguage] = useState("English");
  const [context, setContext] = useState("casual");
  const [personality, setPersonality] = useState("Confident");
  const [reply, setReply] = useState("");
  const [error, setError] = useState("");

  const handleGenerateReply = async () => {
    setError("");
    setReply("");
    try {
      const response = await fetch(`${API_BASE_URL}/api/generate-reply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message, tone, language, context, personality }),
      });

      const data = await response.json();
      if (response.ok) {
        setReply(data.reply);
      } else {
        setError(data.error || "Error contacting AI backend.");
      }
    } catch (err) {
      setError("Error contacting AI backend.");
      console.error(err);
    }
  };

  const handleCopy = () => {
    if (reply) {
      navigator.clipboard.writeText(reply);
      alert("Reply copied to clipboard!");
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>Flirty Response AI</h1>
      <textarea
        placeholder="Paste boyfriend's message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={4}
        cols={50}
      />

      <div style={{ marginTop: "1rem" }}>
        <label>Tone: </label>
        <select value={tone} onChange={(e) => setTone(e.target.value)}>
          <option>Flirty</option>
          <option>Romantic</option>
          <option>Playful</option>
          <option>Funny</option>
        </select>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <label>Language: </label>
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option>English</option>
          <option>Hindi</option>
          <option>Hinglish</option>
        </select>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <label>Context: </label>
        <select value={context} onChange={(e) => setContext(e.target.value)}>
          <option>casual</option>
          <option>jealous</option>
          <option>playful</option>
          <option>long-distance</option>
        </select>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <label>Personality: </label>
        <select
          value={personality}
          onChange={(e) => setPersonality(e.target.value)}
        >
          <option>Confident</option>
          <option>Cute</option>
          <option>Sassy</option>
          <option>Shy</option>
        </select>
      </div>

      <button
        style={{ marginTop: "1rem", padding: "0.5rem 1rem", cursor: "pointer" }}
        onClick={handleGenerateReply}
      >
        Generate Reply
      </button>

      {reply && (
        <div style={{ marginTop: "1rem" }}>
          <h2>AI Reply:</h2>
          <p>{reply}</p>
          <button onClick={handleCopy}>Copy Reply</button>
        </div>
      )}

      {error && <p style={{ color: "red" }}>⚠️ {error}</p>}
    </div>
  );
}

export default App;
