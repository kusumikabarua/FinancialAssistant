const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;

app.use(bodyParser.json());

// Endpoint to handle incoming messages from frontend
app.post('/api/message', async (req, res) => {
  const { message } = req.body;

  // Replace with your ChatGPT Assistant API endpoint and API key
  const apiUrl = 'https://api.openai.com/v1/chat/completions';
  const apiKey = 'YOUR_OPENAI_API_KEY';

  try {
    const response = await axios.post(apiUrl, {
      model: "gpt-3.5-turbo",
      prompt: message,
      max_tokens: 150,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
    });

    const answer = response.data.choices[0].text.trim();
    res.json({ answer });
  } catch (error) {
    console.error('Error fetching response from ChatGPT:', error);
    res.status(500).json({ error: 'Failed to fetch response from ChatGPT' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
