import {
  initBuilding,
  updateElement,
  changeBuildingColor,
  unInitBuilding,
} from "./building.js";
import { clearLastMessage, addMessage, clearMessages } from "./chat.js";
import { layers } from "./data/layers.js";
import { messages, messagesJury } from "./data/messages.js";

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
let visitedElements = [];

// DOM elements
const slider = document.querySelector(".slider");
const sliderInput = document.querySelector(".slider--input");
const element = document.querySelector(".element");
const footer = document.querySelector("footer");
const year = document.querySelector(".year");
const colorButtonContainer = document.querySelector(".button-container");
const trophyButton = document.querySelector(".trophy");

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
const hideSlider = () => toggleDisplay([slider, element, footer], "none");

const displaySlider = () => {
  toggleDisplay([slider, element], "block");
  updateElement(layers.length);
};

const hideColorButton = () => {
  colorButtonContainer.style.display = "none";
};

const displayTrophyButton = () => {
  trophyButton.style.display = "block";
};

const hideTrophyButton = () => {
  trophyButton.style.display = "none";
};

// STEP 5: Change building color
const handleColorButtonClick = () => {
  changeBuildingColor();
  hideColorButton();
  displaySlider();
};

const displayColorButton = () => {
  scrollTo(0, 0);
  footer.style.display = "block";
  colorButtonContainer.style.display = "flex";
  colorButtonContainer.addEventListener("click", handleColorButtonClick);
};

const updateTrophy = () => {
  const visitedCount = visitedElements.length;

  switch (visitedCount) {
    case 3: {
      displayTrophyButton();
      break;
    }
    case 6: {
      trophyButton.src = `images/icons/trophy-02.svg`;
      break;
    }
    case 9: {
      trophyButton.src = `images/icons/trophy-03.svg`;
      trophyButton.addEventListener("click", handleTrophyButtonClick);
      break;
    }
  }
};

const addVisitedElement = (element) => {
  if (!visitedElements.includes(element)) {
    visitedElements.push(element);
    updateTrophy();
  }
};

sliderInput.addEventListener("input", () => {
  const value = parseInt(sliderInput.value, 10);

  addVisitedElement(value);
});

const handleTrophyButtonClick = () => {
  unInitBuilding();
  hideSlider();
  hideTrophyButton();
  incrementYear();
  updateTimeline();
};

const displayJuryMessage = () => {
  currentMessages = messagesJury;
  console;
  startChat();
};

// Main timeline function
const updateTimeline = () => {
  let timeout = currentYear <= 1964 ? 200 : currentYear < 1966 ? 800 : 150;

  const interval = setInterval(() => {
    if (currentYear < 1963) {
      incrementYear();
    } else if (currentYear === 1963) {
      // STEP 3: Stop timeline and wait for click. Then start interval again.
      clearInterval(interval);
    } else if (currentYear === 1964) {
      // Clear interval and wait for green button click
      incrementYear();
    } else if (currentYear === 1965) {
      // STEP 6: Display slider and wait for click play button
      incrementYear();
      displayColorButton();
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
    document.removeEventListener("click", handleClick);
    clearMessages();

    // STEP 4: Add building and add color button. Start timeline again.
    if (currentYear < 1964) {
      incrementYear();
      initBuilding(() => {});
      updateTimeline();
    } else {
      // TODO: sources
    }
  }
};

const startChat = () => {
  // display first message without waiting for click
  addMessageWithLoading(currentMessages.shift());
  document.addEventListener("click", handleClick);
};

// STEP 1: Start chat
currentMessages = messages;
startChat();
