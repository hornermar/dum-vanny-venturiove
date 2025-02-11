const chat = document.querySelector(".chat");

export const addMessage = (message) => {
  chat.style.display = "flex";
  const messageEl = document.createElement("div");
  const senderEl = document.createElement("div");
  const textEl = document.createElement("div");

  senderEl.textContent = message.sender;
  senderEl.classList.add("message-sender");

  textEl.textContent = message.text;
  textEl.classList.add("message-text");

  messageEl.classList.add("message", "message--received");

  if (message.sender === "Robert Venturi") {
    messageEl.classList.add("message--right");
  } else {
    messageEl.classList.add("message--left");
  }

  messageEl.appendChild(senderEl);
  messageEl.appendChild(textEl);
  chat.appendChild(messageEl);
};

export const clearMessages = () => {
  while (chat.firstChild) {
    chat.removeChild(chat.firstChild);
  }
};
