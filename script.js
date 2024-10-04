// Send a chat message
const sendMessage = () => {
    const messageText = messageInput.value.trim();
    if (messageText && username) {
        const messagesRef = ref(database, 'messages/');
        push(messagesRef, {
            text: messageText,
            timestamp: Date.now(),
            name: username // Store the username who sent the message
        });
        messageInput.value = ''; // Clear input
    } else {
        alert('Please enter a message!');
    }
};

// Event listener for sending a message
sendMessageButton.addEventListener('click', sendMessage);

// Event listener for pressing "Enter" key
messageInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent form submission if within a form
        sendMessage();
    }
});
