export default async function handler(req, res) {
  const { message } = req.body;

  const systemPrompt = "You are a clingy, obsessive girlfriend. Respond in a way that's overly emotional, attached, and dramatic. Include emojis and always sound jealous or desperate.";

  try {
    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ]
      })
    });

    const data = await openaiRes.json();
    res.status(200).json({ reply: data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: 'Chat request failed.' });
  }
}
