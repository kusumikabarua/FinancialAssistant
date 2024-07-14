const express = require("express");
require("dotenv").config({ path: "src/.env" });
const axios = require("axios");
const bodyParser = require("body-parser");
const app = express();
const port = 4000;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.json());

// Endpoint to handle incoming messages from frontend
app.post("/api/message", async (req, res) => {
  const { message } = req.body;


  // Replace with your ChatGPT Assistant API endpoint and API key
  const apiUrl = "https://api.openai.com/v1/chat/completions";
  const apiKey = process.env.YOUR_OPENAI_API_KEY;

  try {
    const response = await axios.post(
      apiUrl,
      {
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "user", "content": message}],
        "max_tokens": 10
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
      }
    );

    const answer = response.data.choices[0].message.content.trim();
    res.json({ answer });
  } catch (error) {
    console.error("Error fetching response from ChatGPT:", error);
    res.status(500).json({ error: "Failed to fetch response from ChatGPT" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
