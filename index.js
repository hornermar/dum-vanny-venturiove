import { initBuilding, updateElement } from "./building.js";
import { clearLastMessage, addMessage, clearMessages } from "./chat.js";
import { layers } from "./data/layers.js";
import { messages, lastMessage } from "./data/messages.js";

let currentYear = 1960;
let currentMessages = [];
let clickInterval;

const chat = document.querySelector(".chat");
const slider = document.querySelector(".slider");
const element = document.querySelector(".element");
const footer = document.querySelector("footer");

const year = document.querySelector(".year");

// Utility functions
const displaySlider = () => {
  const elements = [slider, element, footer];

  elements.forEach((element) => {
    element.style.display = "block";
    updateElement(layers.length);
  });
};

const addLoadingMessages = (messages) => {
  const messagesWithLoading = [];
  messages.forEach((message) => {
    if (message.text !== "...") {
      messagesWithLoading.push({ text: "...", sender: message.sender });
    }
    messagesWithLoading.push(message);
  });
  return messagesWithLoading;
};

// STEP 2: Update year
const updateYear = () => {
  const interval = setInterval(() => {
    if (currentYear <= 1964) {
      year.textContent = currentYear;
      currentYear++;
    } else {
      clearInterval(interval);
    }
  }, 3000);
};

// STEP 3: Remove chat and show building
const changeToBuilding = () => {
  const checkInterval = setInterval(() => {
    if (currentYear === 1965) {
      clearLastMessage();
      addMessage(lastMessage);
      clearInterval(checkInterval);
      chat.style.display = "none";
      year.style.display = "none";
      initBuilding(displaySlider);
    }
  }, 2000);
};

const handleClick = () => {
  if (currentMessages.length > 0) {
    const message = currentMessages.shift();
    const nextMessage = currentMessages[0];

    if (message) {
      if (message.text === "..." && nextMessage?.text === "...") {
        // STEP 2: Update year
        updateYear();
      } else if (nextMessage?.sender === "Mies van der Rohe") {
        clearMessages();
      }

      addMessage(message);

      if (currentMessages.length === 0) {
        // STEP 3: Remove chat and show building

        document.removeEventListener("click", handleClick);
        clearInterval(clickInterval);
        changeToBuilding();
      }
    }
  }
};

const resetClickInterval = () => {
  if (clickInterval) {
    clearInterval(clickInterval);
  }
  clickInterval = setInterval(handleClick, 5000);
};

const startChat = () => {
  currentMessages = addLoadingMessages(messages);

  // display first message without waiting for click
  addMessage(currentMessages.shift());

  document.addEventListener("click", () => {
    handleClick();
    resetClickInterval();
  });

  resetClickInterval();
};

// STEP 1: Start chat
startChat();
