import systemPrompt from './clingy.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    console.error("API key not set");
    return res.status(500).json({ error: "API key not configured" });
  }

  const userMessage = req.body.message;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage }
        ],
        temperature: 0.9,
      })
    });

    const data = await response.json();

    if (!data.choices || !data.choices[0]?.message?.content) {
      console.error('OpenAI Error Response:', data);
      return res.status(500).json({ reply: "Ughh... I think something broke 💔" });
    }

    res.status(200).json({ reply: data.choices[0].message.content });

  } catch (error) {
    console.error('Fetch Error:', error);
    res.status(500).json({ reply: "Something went wrong 💔" });
  }
}
