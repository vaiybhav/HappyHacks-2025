const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
const PORT = 3002; // Different from your other servers

app.use(cors());
app.use(express.json());

const GEMINI_API_KEY_WELLNESS = 'AIzaSyCzEsHWA7hInfhja-Bl21UfewxbflinpKs';

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY_WELLNESS);

app.post('/affirmation', async (req, res) => {
  const { theme } = req.body;

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const result = await model.generateContent(
      `You are a positive mental health assistant. 
      Create a short, uplifting, one or two-sentence affirmation related to the theme: "${theme}". 
      Make it encouraging and focused on hope, resilience, or self-belief.`
    );

    const response = await result.response;
    const rawAffirmation = response.text().trim();
    const affirmation = rawAffirmation.replace(/[*_`#>\\-]/g, '').replace(/\n{2,}/g, '\n').trim();

    res.json({ affirmation });
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
    res.status(500).json({ affirmation: 'Sorry, something went wrong generating your affirmation.' });
  }
});

app.listen(PORT, () => {
  console.log(`Affirmation server running on http://localhost:${PORT}`);
});
