let currentMessages = [];
let currentCallback = null;

const chat = document.querySelector(".chat");

const createLoadingMessage = (element) => {
  element.classList.add("message-text--loading");

  for (let i = 0; i < 3; i++) {
    const line = document.createElement("div");
    line.classList.add("line");
    element.appendChild(line);
  }
};

const addMessage = (message) => {
  chat.style.display = "flex";
  const messageEl = document.createElement("div");
  const senderEl = document.createElement("div");
  const textEl = document.createElement("div");

  senderEl.textContent = message.sender;
  senderEl.classList.add("message-sender");

  if (message.text === "...") {
    createLoadingMessage(textEl);
  } else {
    textEl.textContent = message.text;
  }

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

// export const clearMessages = () => {
//   while (chat.firstChild) {
//     chat.removeChild(chat.firstChild);
//   }
// };

export const clearLastMessage = () => {
  chat.removeChild(chat.lastChild);
};

const handleClick = (messages, callback) => {
  if (messages.length > 0) {
    const message = messages.shift();
    if (message && messages.length > 0) {
      addMessage(message);
    } else {
      addMessage(message);
      document.removeEventListener("click", handleClickWrapper);
      callback();
    }
  } else {
    document.removeEventListener("click", handleClickWrapper);
    callback();
  }
};

const handleClickWrapper = () => {
  handleClick(currentMessages, currentCallback);
};

export const startChat = (messages, callback) => {
  // display first message without waiting for click
  addMessage(messages[0]);
  messages.shift();

  currentMessages = messages;
  currentCallback = callback;

  document.addEventListener("click", handleClickWrapper);
};
