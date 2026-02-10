import express from "express";

const app = express();
app.use(express.json());
app.use(express.static("public"));

const OLLAMA_URL =
  process.env.OLLAMA_URL || "http://ollama:11434/api/generate";
const MODEL = process.env.OLLAMA_MODEL || "llama3";

app.post("/ask", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const response = await fetch(OLLAMA_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: MODEL,
        prompt,
        stream: false
      })
    });

    // 🔍 log status
    console.log("Ollama status:", response.status);

    const data = await response.json();
    console.log("Ollama raw response:", data);

    // 🛡️ safety fallback
    const answer =
      data.response ||
      data.message?.content ||
      "⚠️ No response from model";

    res.json({ answer });
  } catch (err) {
    console.error("Ollama error:", err);
    res.status(500).json({ error: "Failed to connect to Ollama" });
  }
});

app.listen(3000, () => {
  console.log("🌐 Web agent running at http://localhost:3000");
});
