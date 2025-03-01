import {
  initBuilding,
  updateElement,
  changeBuildingColor,
} from "./building.js";
import { clearLastMessage, addMessage, clearMessages } from "./chat.js";
import { layers } from "./data/layers.js";
import { messages, messageJury } from "./data/messages.js";

let currentYear = 1959;
let currentMessages = [];
let isWriting = false;

const slider = document.querySelector(".slider");
const element = document.querySelector(".element");
const footer = document.querySelector("footer");

const year = document.querySelector(".year");

const colorButtonContainer = document.querySelector(".button-container");
const playButton = document.querySelector(".arrow-right-container");

// Utility functions
const addYear = () => {
  currentYear++;
  year.textContent = currentYear;
};

const calculateDelay = (text) => {
  const baseDelay = text.length * 50;
  return Math.min(Math.max(baseDelay, 700), 3500);
};

const addMessageWithLoading = (message) => {
  const delay = calculateDelay(message.text);
  isWriting = true;
  addMessage({ sender: message.sender, text: "..." });

  setTimeout(() => {
    isWriting = false;
    clearLastMessage();
    addMessage(message);
  }, delay);
};

const hideSlider = () => {
  slider.style.display = "none";
  element.style.display = "none";
};

const displaySlider = () => {
  const elements = [slider, element];

  elements.forEach((element) => {
    element.style.display = "block";
    updateElement(layers.length);
  });

  displayPlayButton();
};

const hideColorButton = () => {
  colorButtonContainer.style.display = "none";
};

const displayColorButton = () => {
  scrollTo(0, 0);
  footer.style.display = "block";
  colorButtonContainer.style.display = "flex";
  colorButtonContainer.addEventListener("click", () => {
    changeBuildingColor();
    hideColorButton();
    updateYear();
  });
};

const hidePlayButton = () => {
  playButton.style.display = "none";
};

const displayPlayButton = () => {
  playButton.style.display = "flex";
  playButton.addEventListener("click", () => {
    updateElement(layers.length);
    hideSlider();
    hidePlayButton();
    addYear();
    updateYear();
  });
};

const displayJuryMessage = () => {
  addMessage(messageJury[0]);
  addMessage(messageJury[1]);
};

// Main timeline function
const updateYear = () => {
  let timeout = currentYear <= 1964 ? 5500 : currentYear < 1966 ? 800 : 200;

  const interval = setInterval(() => {
    if (currentYear < 1963) {
      addYear();
    } else if (currentYear === 1963) {
      // CLear interval and wait for click. Then start interval again
      clearInterval(interval);
    } else if (currentYear === 1964) {
      addYear();

      // Clear interval and wait for green button click
      clearInterval(interval);
    } else if (currentYear === 1965) {
      addYear();
      // STEP 5: Display slider and wait for click play button
      displaySlider();
      clearInterval(interval);
    } else if (currentYear > 1966 && currentYear < 1991) {
      addYear();
    } else if (currentYear === 1991) {
      clearInterval(interval);
      displayJuryMessage();
    }
  }, timeout);
};

const handleClick = () => {
  if (isWriting) {
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
    // STEP 4: Add building and add color button

    document.removeEventListener("click", handleClick);
    clearMessages();
    // chat.style.display = "none";
    addYear();
    initBuilding(displayColorButton);
    updateYear();
  }
};

const startChat = () => {
  currentMessages = messages;

  // display first message without waiting for click
  addMessageWithLoading(currentMessages.shift());

  document.addEventListener("click", handleClick);
};

// STEP 1: Start chat
startChat();
// initBuilding();
// displaySlider();
//  displayColorButton();
