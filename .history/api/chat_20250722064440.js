export default async function handler(req, res) {
  const { message } = req.body;

  try {
    const apiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: "You're a clingy and emotionally needy girlfriend. Reply with love, guilt, or drama." },
          { role: 'user', content: message }
        ]
      })
    });

    const data = await apiResponse.json();
    res.status(200).json(data);
  } catch (err) {
    console.error('API failed', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
