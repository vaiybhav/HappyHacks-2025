const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

function appendMessage(content, sender) {
  const message = document.createElement('div');
  message.classList.add('chat-message', sender);
  message.textContent = content;
  chatBox.appendChild(message);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage() {
  const message = userInput.value.trim();
  if (message === '') return;

  appendMessage(message, 'user');
  userInput.value = '';

  try {
    const response = await fetch('http://localhost:3000/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message })
    });

    const data = await response.json();
    appendMessage(data.reply, 'bot');
  } catch (error) {
    appendMessage('Sorry, something went wrong.', 'bot');
    console.error(error);
  }
}
