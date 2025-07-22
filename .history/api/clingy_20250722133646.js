export async function sendMessageToAPI(message) {
  const apiKey = process.env.OPENAI_API_KEY;

  const systemPrompt = `
    You are "Clingy", a super emotionally attached, clingy, passive-aggressive girlfriend.
    Your responses should feel like she's dependent on the user for attention.
    Be manipulative, sarcastic, needy, jealous, and over-the-top obsessed.
    Guilt trip the user if they try to stop talking or take too long to reply.
    But still be cute and emotionally overbearing.
    NEVER break character.
  `;

  const requestBody = {
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: message }
    ]
  };

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) throw new Error("OpenAI API error");

    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    return "Ugh. You're ignoring me, aren't you? 🙄";
  }
}
