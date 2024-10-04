// Import necessary Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-database.js";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBtCXKQaQ-jhAbWdR5QhpC3qpM8q-2iIRs",
    authDomain: "sync-chatapp.firebaseapp.com",
    projectId: "sync-chatapp",
    storageBucket: "sync-chatapp.appspot.com",
    messagingSenderId: "97065081236",
    appId: "1:97065081236:web:053401a544ea9b16d01781",
    measurementId: "G-ENHKYS3RBL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// DOM elements
const usernameInput = document.getElementById('username');
const setUsernameButton = document.getElementById('set-username');
const chatSection = document.getElementById('chat-section');
const chatMessages = document.getElementById('chat-messages');
const messageInput = document.getElementById('message');
const sendMessageButton = document.getElementById('send-message');

// Store the username
let username = '';

// Set username
setUsernameButton.addEventListener('click', () => {
    username = usernameInput.value.trim();
    if (username) {
        usernameInput.value = ''; // Clear the input field
        document.getElementById('username-section').classList.add('hidden'); // Hide name input section
        chatSection.classList.remove('hidden'); // Show chat section
        loadChatMessages(); // Load existing messages
    } else {
        alert('Please enter a valid name!');
    }
});

// Load chat messages
const loadChatMessages = () => {
    const messagesRef = ref(database, 'messages/');
    onValue(messagesRef, (snapshot) => {
        const messages = snapshot.val();
        chatMessages.innerHTML = ''; // Clear messages
        for (const messageId in messages) {
            const li = document.createElement('li');
            li.textContent = `${messages[messageId].name}: ${messages[messageId].text} (sent at ${new Date(messages[messageId].timestamp).toLocaleTimeString()})`;
            chatMessages.appendChild(li);
        }
    });
};

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

// Event listener for sending a message on button click
sendMessageButton.addEventListener('click', sendMessage);

// Event listener for pressing "Enter" key
messageInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent form submission if within a form
        sendMessage();
    }
});
