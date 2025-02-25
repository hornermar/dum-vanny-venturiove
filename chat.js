const chat = document.querySelector(".chat");

const createLoadingMessage = (element) => {
  element.classList.add("message-text--loading");

  for (let i = 0; i < 3; i++) {
    const line = document.createElement("div");
    line.classList.add("line");
    element.appendChild(line);
  }
};

export const addMessage = (message) => {
  const messageEl = document.createElement("div");
  const senderEl = document.createElement("div");
  const textEl = document.createElement("div");

  senderEl.textContent = message.sender;
  senderEl.classList.add("message-sender");

  messageEl.classList.add("message");

  if (message.sender === "Robert Venturi") {
    messageEl.classList.add("message--right");
  } else {
    messageEl.classList.add("message--left");
  }

  if (
    message.sender === "Marcel Breuer" ||
    message.sender === "Mies van der Rohe"
  ) {
    messageEl.classList.add("message--dark");
  }

  if (message.text === "...") {
    createLoadingMessage(textEl);
  } else {
    textEl.textContent = message.text;
  }

  textEl.classList.add("message-text");

  messageEl.appendChild(senderEl);
  messageEl.appendChild(textEl);
  chat.appendChild(messageEl);

  // Scroll to the bottom of the page
  messageEl.scrollIntoView({ behavior: "smooth" });
};

export const clearMessages = () => {
  while (chat.firstChild) {
    chat.removeChild(chat.firstChild);
  }
};

export const clearLastMessage = () => {
  chat.lastChild && chat.removeChild(chat.lastChild);
};
