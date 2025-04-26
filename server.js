const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Load your Gemini API key here
const GEMINI_API_KEY = 'AIzaSyCSKmU7iOcts11J2df78jlENwMLqLTVUL8'; // <-- replace with your real Gemini API key

const app = express();
app.use(cors());
app.use(bodyParser.json());

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const result = await model.generateContent(
      `You are a supportive and empathetic mental health chatbot. Always stay on topic, focusing only on providing emotional support, comfort, and positivity. Avoid unrelated facts, jokes, or topics. Respond kindly and empathetically to the following user input: "${userMessage}"`
    );
    const response = await result.response;
    const rawReply = response.text().trim();
    const reply = rawReply.replace(/[*_`#>\\-]/g, '').replace(/\n{2,}/g, '\n').trim();

    res.json({ reply });
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
    res.status(500).json({ reply: 'Sorry, there was an error talking to the AI.' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});