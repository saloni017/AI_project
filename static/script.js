function toggleChatbot() {
    const popup = document.getElementById('chat-popup');
    popup.style.display = popup.style.display === 'block' ? 'none' : 'block';
}

function sendMessage() {
    const input = document.getElementById("user-input");
    const chatBox = document.getElementById("chat-box");
    const message = input.value.trim();

    if (!message) return;

    // Show user's message
    const userMessage = document.createElement("div");
    userMessage.textContent = "You: " + message;
    chatBox.appendChild(userMessage);

    // Call backend
    fetch("/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message })
    })
    .then(response => response.json())
    .then(data => {
        const botMessage = document.createElement("div");
        botMessage.textContent = "Bot: " + data.response;
        chatBox.appendChild(botMessage);
        chatBox.scrollTop = chatBox.scrollHeight;
    });

    input.value = "";
}
