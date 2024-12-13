class ChatBot {
  constructor() {
    this.chatToggle = document.getElementById("chatToggle");
    this.initializeEventListeners();
  }

  initializeEventListeners() {
    this.chatToggle.addEventListener("click", () => {
      // For now, just redirect to a chat website
      window.open("https://medibotai.netlify.app/", "_blank");
    });
  }
}

// Initialize the chat bot
new ChatBot();
