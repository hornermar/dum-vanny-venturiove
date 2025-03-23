const chat = document.querySelector(".chat");

const createLoadingMessage = (element) => {
  element.classList.add("message-text--loading");

  for (let i = 0; i < 3; i++) {
    const line = document.createElement("div");
    line.classList.add("line");
    element.appendChild(line);
  }
};

const isElementInViewport = (el) => {
  const rect = el.getBoundingClientRect();
  return rect.bottom <= window.innerHeight - 32;
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
    messageEl.classList.add("message--left", "message--dark");

    if (message.sender === "Mies van der Rohe") {
      senderEl.classList.add("message--mies");
    } else if (message.sender === "Marcel Breuer") {
      senderEl.classList.add("message--breuer");
    } else if (message.sender === "Kritik*čka architektury") {
      senderEl.classList.add("message--critic");
    }
  }

  if (message.text === "...") {
    createLoadingMessage(textEl);
  } else {
    textEl.innerHTML = message.text;
  }

  textEl.classList.add("message-text");

  messageEl.appendChild(senderEl);
  messageEl.appendChild(textEl);
  chat.appendChild(messageEl);

  // Scroll to the bottom of the page
  if (!isElementInViewport(messageEl)) {
    messageEl.scrollIntoView({ behavior: "smooth" });
  }
};

export const clearMessages = () => {
  while (chat.firstChild) {
    chat.removeChild(chat.firstChild);
  }
};

export const clearLastMessage = () => {
  chat.lastChild && chat.removeChild(chat.lastChild);
};
