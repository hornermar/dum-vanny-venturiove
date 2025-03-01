import {
  initBuilding,
  updateElement,
  changeBuildingColor,
} from "./building.js";
import { clearLastMessage, addMessage, clearMessages } from "./chat.js";
import { layers } from "./data/layers.js";
import { messages, messageJury } from "./data/messages.js";

/* 

STEP 1: Start chat
STEP 2: Start timeline
STEP 3: Stop timeline and wait for click. Then start interval again.
STEP 4: Add building and add color button. Start timeline again.
STEP 5: Change building color
STEP 6: Display slider and wait for click play button
STEP 7: Update timeline and display jury message

*/

// Constants
const INITIAL_YEAR = 1959;
const BASE_DELAY_MULTIPLIER = 50;
const MIN_DELAY = 700;
const MAX_DELAY = 3500;

// State variables
let currentYear = INITIAL_YEAR;
let currentMessages = [];
let isWriting = false;

// DOM elements
const slider = document.querySelector(".slider");
const element = document.querySelector(".element");
const footer = document.querySelector("footer");
const year = document.querySelector(".year");
const colorButtonContainer = document.querySelector(".button-container");
const playButton = document.querySelector(".arrow-right-container");

// Utility functions
const incrementYear = () => {
  currentYear++;
  year.textContent = currentYear;
};

const calculateDelay = (text) => {
  const baseDelay = text.length * BASE_DELAY_MULTIPLIER;
  return Math.min(Math.max(baseDelay, MIN_DELAY), MAX_DELAY);
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

const toggleDisplay = (elements, displayStyle) => {
  elements.forEach((element) => {
    element.style.display = displayStyle;
  });
};

// Functions to handle UI elements
const hideSlider = () => toggleDisplay([slider, element], "none");

const displaySlider = () => {
  toggleDisplay([slider, element], "block");
  updateElement(layers.length);
  displayPlayButton();
};

const hideColorButton = () => {
  colorButtonContainer.style.display = "none";
};

// STEP 5: Change building color
const handleColorButtonClick = () => {
  changeBuildingColor();
  hideColorButton();
  updateTimeline();
};

const displayColorButton = () => {
  scrollTo(0, 0);
  footer.style.display = "block";
  colorButtonContainer.style.display = "flex";
  colorButtonContainer.addEventListener("click", handleColorButtonClick);
};

const hidePlayButton = () => {
  playButton.style.display = "none";
};

const displayPlayButton = () => {
  playButton.style.display = "flex";
  playButton.addEventListener("click", handlePlayButtonClick);
};

// STEP 7: Update timeline and display jury message
const handlePlayButtonClick = () => {
  updateElement(layers.length);
  hideSlider();
  hidePlayButton();
  incrementYear();
  updateTimeline();
};

const displayJuryMessage = () => {
  messageJury.forEach(addMessage);
};

// Main timeline function
const updateTimeline = () => {
  let timeout = currentYear <= 1964 ? 5200 : currentYear < 1966 ? 800 : 200;

  const interval = setInterval(() => {
    if (currentYear < 1963) {
      incrementYear();
    } else if (currentYear === 1963) {
      // STEP 3: Stop timeline and wait for click. Then start interval again.
      clearInterval(interval);
    } else if (currentYear === 1964) {
      // Clear interval and wait for green button click
      incrementYear();
      clearInterval(interval);
    } else if (currentYear === 1965) {
      // STEP 6: Display slider and wait for click play button
      incrementYear();
      displaySlider();
      clearInterval(interval);
    } else if (currentYear > 1966 && currentYear < 1991) {
      incrementYear();
    } else if (currentYear === 1991) {
      clearInterval(interval);
      displayJuryMessage();
    }
  }, timeout);
};

const handleClick = () => {
  if (isWriting) return;

  if (currentMessages.length > 0) {
    const message = currentMessages.shift();
    if (message) {
      if (message.text === "Jdu na to!") {
        // STEP 2: Start timeline
        updateTimeline();
      }
      addMessageWithLoading(message);
    }
  } else {
    // STEP 4: Add building and add color button. Start timeline again.
    document.removeEventListener("click", handleClick);
    clearMessages();
    incrementYear();
    initBuilding(displayColorButton);
    updateTimeline();
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
