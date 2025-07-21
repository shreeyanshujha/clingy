async function sendMessage() {
  const input = document.getElementById('userInput');
  const message = input.value.trim();
  if (!message) return;

  const chatContainer = document.getElementById('chatContainer');
  chatContainer.innerHTML += `<p><strong>You:</strong> ${message}</p>`;
  input.value = '';

  const response = await fetch('/api/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ message })
});

  const data = await response.json();
  const reply = data.choices[0].message.content;
  chatContainer.innerHTML += `<p><strong>Clingy:</strong> ${reply}</p>`;
}
