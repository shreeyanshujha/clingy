async function sendMessage() {
  const input = document.getElementById('userInput');
  const message = input.value.trim();
  if (!message) return;

  const chatContainer = document.getElementById('chatContainer');
  chatContainer.innerHTML += `<p><strong>You:</strong> ${message}</p>`;
  input.value = '';

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_API_KEY' // Replace in Vercel env
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message }
      ]
    })
  });

  const data = await response.json();
  const reply = data.choices[0].message.content;
  chatContainer.innerHTML += `<p><strong>Clingy:</strong> ${reply}</p>`;
}
