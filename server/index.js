const express = require('express');
const OpenAIApi = require('openai');

const app = express();

app.use(express.json());
app.use(express.raw({ limit: '20mb' }));

// Define your OpenAI API key
const OPENAI_API_KEY = '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';

// Initialize the OpenAI API client
const openai = new OpenAIApi({
  key: OPENAI_API_KEY,
});

app.post('/generate', async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct",
      prompt,
      temperature: 1.2,
      max_tokens: 4000,
    });

    const generatedText = response.choices[0].text;

    res.json({ generatedText });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate text.' });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
