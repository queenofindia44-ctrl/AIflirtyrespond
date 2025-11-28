const express = require("express");
const router = express.Router();
const axios = require("axios");

const GROQ_API_KEY = process.env.GROQ_API_KEY;

router.post("/", async (req, res) => {
  const { message, tone, language, context, personality } = req.body;
  if (!message) return res.status(400).json({ error: "Message is required" });

  const prompt = `
You are a professional flirty chat assistant.
Analyze the message and generate a playful, flirty, convincing response.
Tone: ${tone || "Flirty"}
Language: ${language || "English"}
Context: ${context || "casual"}
Personality: ${personality || "confident"}
Message: ${message}
  `.trim();

  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.8,
        max_tokens: 200
      },
      {
        headers: {
          "Authorization": `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const reply = response.data.choices[0].message.content;
    res.json({ reply });
  } catch (err) {
    console.error("Groq API error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to generate reply via Groq API" });
  }
});

module.exports = router;
