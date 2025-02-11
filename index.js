import { initBuilding, updateElement } from "./building.js";
import { clearLastMessage, startChat } from "./chat.js";
import { layers } from "./data/layers.js";
import { messages1, messages2 } from "./data/messages.js";

const chat = document.querySelector(".chat");
const slider = document.querySelector(".slider");
const element = document.querySelector(".element");
const footer = document.querySelector("footer");

// const progressBar = document.querySelector(".progressbar");
const year = document.querySelector(".year");

// Utility functions
const displaySlider = () => {
  const elements = [slider, element, footer];

  elements.forEach((element) => {
    element.style.display = "block";
    updateElement(layers.length);
  });
};

// STEP 2: Update year
const updateYear = () => {
  const years = [1960, 1961, 1962, 1963, 1964];
  let currentYearIndex = 0;

  const interval = setInterval(() => {
    if (currentYearIndex < years.length) {
      year.textContent = years[currentYearIndex];
      currentYearIndex++;
    } else {
      clearInterval(interval);
      clearLastMessage();

      // STEP 3: Finish chat
      startChat(messages2, changeToBuilding);
    }
  }, 1000);
};

// STEP 4: Remove chat and show building
const changeToBuilding = () => {
  chat.style.display = "none";
  year.style.display = "none";
  initBuilding(displaySlider);
};

// STEP 1: Start chat
startChat(messages1, updateYear);
