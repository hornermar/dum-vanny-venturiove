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

const year = document.querySelector(".year");

const colorButtonContainer = document.querySelector(".button-container");
const colorButton = document.querySelector("button");

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

const addMessageWithLoading = (message) => {
  isWriting = true;
  addMessage({ sender: message.sender, text: "..." });

  setTimeout(() => {
    isWriting = false;
    clearLastMessage();
    addMessage(message);
  }, message.text.length * 50);
};

const addColorButton = () => {
  colorButtonContainer.style.display = "flex";
  colorButton.addEventListener("click", () => {
    changeBuildingColor();
    displaySlider();
    colorButtonContainer.style.display = "none";
  });
};

// Main timeline function
const updateYear = () => {
  const interval = setInterval(() => {
    if (currentYear < 1963) {
      addYear();
    } else if (currentYear === 1963 && !isChatActive) {
      // STEP 3: Remove chat and show building
      chat.style.display = "none";
      addYear();
      initBuilding();
    } else if (currentYear === 1964) {
      // STEP 4: Add color button
      addYear();
    } else if (currentYear === 1965) {
      addYear();
      addColorButton();
    } else if (currentYear === 1966) {
      addYear();
      clearInterval(interval);
    }
  }, 3000);
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
    }
  } else {
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
// initBuilding();
// addColorButton();
