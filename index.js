import {
  initBuilding,
  updateElement,
  changeBuildingColor,
} from "./building.js";
import { clearLastMessage, addMessage, clearMessages } from "./chat.js";
import { layers } from "./data/layers.js";
import { messages } from "./data/messages.js";

let currentYear = 1959;
let currentMessages = [];
let isChatActive = true;
let isWriting = false;

const chat = document.querySelector(".chat");
const slider = document.querySelector(".slider");
const element = document.querySelector(".element");
const footer = document.querySelector("footer");

const progressBar = document.getElementById("progress-bar");
const year = document.querySelector(".year");

// Utility functions
const displaySlider = () => {
  const elements = [slider, element, footer];

  elements.forEach((element) => {
    element.style.display = "block";
    updateElement(layers.length);
  });
};

const addYear = () => {
  currentYear++;
  year.textContent = currentYear;
};

const updateYear = () => {
  const interval = setInterval(() => {
    if (currentYear < 1963) {
      addYear();
    } else if (currentYear === 1963 && !isChatActive) {
      // STEP 3: Remove chat and show building

      clearMessages();
      addYear();
      initBuilding();
    } else if (currentYear === 1964) {
      addYear();
      addMessageWithLoading(currentMessages.shift());
      isChatActive = true;
    } else if (currentYear === 1965) {
      addYear();
      clearInterval(interval);
    }
  }, 3000);
};

const addMessageWithLoading = (message) => {
  isWriting = true;
  addMessage({ sender: message.sender, text: "..." });

  setTimeout(() => {
    isWriting = false;
    clearLastMessage();
    addMessage(message);
  }, message.text.length * 50);
};

const handleClick = () => {
  if (isWriting || !isChatActive) {
    return;
  }

  if (currentMessages.length > 0) {
    const message = currentMessages.shift();

    if (message) {
      if (message.text === "Jdu na to!") {
        // STEP 2: Update year
        updateYear();
      }

      addMessageWithLoading(message);

      if (message.text === "Hotovo!") {
        isChatActive = false;
      }
    }
  } else {
    addYear();
    changeBuildingColor();
    clearMessages();
    displaySlider();
    isChatActive = false;
    document.removeEventListener("click", handleClick);
  }
};

const startChat = () => {
  currentMessages = messages;

  // display first message without waiting for click
  addMessageWithLoading(currentMessages.shift());

  document.addEventListener("click", () => {
    handleClick();
  });
};

// STEP 1: Start chat
startChat();
