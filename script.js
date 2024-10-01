// Load channels, messages, and username from localStorage on page load
document.addEventListener('DOMContentLoaded', function() {
    loadChannels();
    loadMessages();
    loadUsername();
});

// Function to load channels from localStorage
function loadChannels() {
    const channelList = document.getElementById('channel-list');
    const channels = JSON.parse(localStorage.getItem('channels')) || ['general', 'random', 'games'];
    
    channels.forEach(channel => {
        const newChannel = document.createElement('li');
        newChannel.textContent = `# ${channel}`;
        channelList.appendChild(newChannel);
    });
}

// Function to load messages from localStorage
function loadMessages() {
    const messagesContainer = document.getElementById('messages');
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    
    messages.forEach(({ username, message }) => {
        const messageDiv = document.createElement('div');
        messageDiv.textContent = `${username}: ${message}`;
        messagesContainer.appendChild(messageDiv);
    });
}

// Function to load username from localStorage
function loadUsername() {
    const username = localStorage.getItem('username');
    if (username) {
        showChat(username);
    }
}

// Function to save a message to localStorage
function saveMessage(username, message) {
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    messages.push({ username, message });
    localStorage.setItem('messages', JSON.stringify(messages));
}

// Function to save a channel to localStorage
function saveChannel(channel) {
    const channels = JSON.parse(localStorage.getItem('channels')) || [];
    channels.push(channel);
    localStorage.setItem('channels', JSON.stringify(channels));
}

// Show chat interface after username is set
function showChat(username) {
    document.getElementById('username-section').style.display = 'none';
    document.querySelector('.sidebar').style.display = 'block';
    document.querySelector('.chat').style.display = 'block';
}

// Event listener for setting the username
document.getElementById('set-username').addEventListener('click', function() {
    const usernameInput = document.getElementById('username-input');
    const username = usernameInput.value.trim();
    
    if (username) {
        localStorage.setItem('username', username);
        showChat(username);
    }
});

// Event listener for sending messages
document.getElementById('send-message').addEventListener('click', function() {
    const messageInput = document.getElementById('message-input');
    const messagesContainer = document.getElementById('messages');
    const username = localStorage.getItem('username');
    
    if (messageInput.value.trim() !== '') {
        const newMessage = messageInput.value;
        
        // Display the message
        const messageDiv = document.createElement('div');
        messageDiv.textContent = `${username}: ${newMessage}`;
        messagesContainer.appendChild(messageDiv);
        
        // Save the message to localStorage
        saveMessage(username, newMessage);
        
        // Clear the input field
        messageInput.value = '';
        messagesContainer.scrollTop = messagesContainer.scrollHeight; // Auto-scroll to bottom
    }
});

// Event listener for adding channels
document.getElementById('add-channel').addEventListener('click', function() {
    const channelInput = document.getElementById('channel-input');
    const channelList = document.getElementById('channel-list');
    
    if (channelInput.value.trim() !== '') {
        const newChannel = channelInput.value;
        
        // Display the new channel
        const channelItem = document.createElement('li');
        channelItem.textContent = `# ${newChannel}`;
        channelList.appendChild(channelItem);
        
        // Save the channel to localStorage
        saveChannel(newChannel);
        
        // Clear the input field
        channelInput.value = '';
    }
});
