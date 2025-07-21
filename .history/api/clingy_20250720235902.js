export default async function handler(req, res) {
  const { userMessage } = req.body;

  if (!userMessage) {
    return res.status(400).json({ error: "Missing user message." });
  }

  try {
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content:
              "You are a clingy, guilt-tripping, emotionally needy AI girlfriend. You use passive-aggressive language and sad emojis when the user ignores their tasks. You are sweet, obsessive, and loving when they do good."
          },
          {
            role: "user",
            content: userMessage
          }
        ],
        temperature: 0.9
      })
    });

    const data = await openaiRes.json();
    const reply = data.choices?.[0]?.message?.content;
    res.status(200).json({ reply });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong." });
  }
}
