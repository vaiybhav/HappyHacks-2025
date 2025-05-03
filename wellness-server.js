require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Use a DIFFERENT Gemini API key for wellness tracker
const GEMINI_API_KEY_WELLNESS = process.env.GEMINI_API_KEY_WELLNESS;

const app = express();
app.use(cors());
app.use(bodyParser.json());

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY_WELLNESS);

app.post('/analyze', async (req, res) => {
  const entries = req.body.entries;

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const formattedEntries = entries.join('\n\n');

    const result = await model.generateContent(
      `You are a mental health wellness assistant. Given the following daily mood logs (even if there are only a few entries):\n\n${formattedEntries}\n\nFind any possible patterns or trends, and if there is not enough data, still offer positive encouragement and general mental health advice. Always write a supportive, uplifting paragraph no matter the amount of information.`
    );

    const response = await result.response;
    const rawAnalysis = response.text().trim();
    const analysis = rawAnalysis.replace(/[*_`#>\\-]/g, '').replace(/\n{2,}/g, '\n').trim();

    res.json({ analysis });
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
    res.status(500).json({ analysis: 'Sorry, there was an error analyzing your entries.' });
  }
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Wellness server running on http://localhost:${PORT}`));
