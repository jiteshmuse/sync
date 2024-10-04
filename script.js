// Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const loginButton = document.getElementById('login-button');
const usernameInput = document.getElementById('username-input');
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const loginContainer = document.getElementById('login-container');

// Log in to chat
loginButton.addEventListener('click', () => {
    const username = usernameInput.value.trim();
    if (username) {
        // Save username in local storage
        localStorage.setItem('username', username);
        loginContainer.style.display = 'none'; // Hide login container
        chatInput.style.display = 'flex'; // Show chat input
        loadMessages(); // Load existing messages
    }
});

// Load messages from Firestore
function loadMessages() {
    db.collection('messages').orderBy('timestamp')
        .onSnapshot(snapshot => {
            chatMessages.innerHTML = ''; // Clear current messages
            snapshot.forEach(doc => {
                const messageData = doc.data();
                const messageDiv = document.createElement('div');
                messageDiv.classList.add('message', messageData.type);
                messageDiv.innerHTML = `<p>${messageData.username}: ${messageData.text}</p><span class="timestamp">${new Date(messageData.timestamp.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>`;
                chatMessages.appendChild(messageDiv);
            });
            chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to bottom
        });
}

// Send a new message
sendButton.addEventListener('click', () => {
    const messageText = messageInput.value.trim();
    const username = localStorage.getItem('username');

    if (messageText && username) {
        db.collection('messages').add({
            username: username,
            text: messageText,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            type: 'sent'
        });
        messageInput.value = ''; // Clear input
    }
});

// Optional: Press Enter to send message
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendButton.click();
    }
});
