async function sendMessage() {
  const input = document.getElementById('userInput');
  const message = input.value.trim();
  if (!message) return;

  const chatContainer = document.getElementById('chatContainer');
  chatContainer.innerHTML += `<p><strong>You:</strong> ${message}</p>`;
  input.value = '';

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message })
    });

    const data = await response.json();

    if (!data.choices || !data.choices[0]) {
      throw new Error("OpenAI response is missing choices");
    }

    const reply = data.choices[0].message.content;
    chatContainer.innerHTML += `<p><strong>Clingy:</strong> ${reply}</p>`;
  } catch (error) {
    console.error('Chatbot error:', error);
    chatContainer.innerHTML += `<p><strong>Clingy:</strong> Ughh... I think something broke 💔</p>`;
  }
}

document.getElementById("userInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    sendMessage();
  }
});
