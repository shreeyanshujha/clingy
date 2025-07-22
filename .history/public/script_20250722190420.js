const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const chatContainer = document.getElementById('chat-container');

userInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    sendMessage();
  }
});

sendBtn.addEventListener('click', sendMessage);

async function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  appendMessage('You', message);
  userInput.value = '';

  try {
    const res = await fetch('/api/clingy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message })
    });

    if (!res.ok) throw new Error('API error');

    const data = await res.json();
    appendMessage('Clingy', data.reply);
  } catch (err) {
    appendMessage('Clingy', "Babe I'm not feeling too well rn (Server error 🥺)");
    console.error(err);
  }
}

function appendMessage(sender, message) {
  const messageEl = document.createElement('div');
  messageEl.classList.add('message');

  const bubble = `
    <div class="${sender === 'You' ? 'user' : 'bot'}-bubble">
      <strong>${sender}:</strong> ${message}
    </div>
  `;
  messageEl.innerHTML = bubble;
  chatContainer.appendChild(messageEl);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}
