const sendButton = document.getElementById('send-button');
const messageInput = document.getElementById('message-input');
const chatMessages = document.getElementById('chat-messages');

sendButton.addEventListener('click', () => {
    const messageText = messageInput.value.trim();
    if (messageText) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', 'sent');
        messageDiv.innerHTML = `<p>${messageText}</p><span class="timestamp">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>`;
        chatMessages.appendChild(messageDiv);
        messageInput.value = ''; // Clear input
        chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to bottom
    }
});
