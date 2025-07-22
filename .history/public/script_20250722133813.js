import { sendMessageToAPI } from './clingy.js';

const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const chatContainer = document.getElementById('chat-container');

// Enter key triggers send
userInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    sendMessage();
  }
});

// Button click triggers send
sendBtn.addEventListener('click', sendMessage);

// Send message and handle response
async function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  appendMessage('You', message);
  userInput.value = '';

  try {
    const reply = await sendMessageToAPI(message);
    appendMessage('Clingy', reply);
  } catch (err) {
    appendMessage('Clingy', "Babe I'm not feeling too well rn (Server error 🥺)");
    console.error(err);
  }
}

// Append message to chat
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
