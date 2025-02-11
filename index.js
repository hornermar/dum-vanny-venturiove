import { initBuilding, updateElement } from "./building.js";
import { addMessage, clearMessages } from "./chat.js";
import { layers } from "./data/layers.js";
import { messages1, messages2 } from "./data/messages.js";

let currentMessages = [];
let currentCallback = null;

const chat = document.querySelector(".chat");
const countdown = document.querySelector(".countdown");
const slider = document.querySelector(".slider");
const footer = document.querySelector("footer");

const startCountdown = () => {
  let timer = 2;
  countdown.style.display = "flex";

  const countdownInterval = setInterval(() => {
    countdown.textContent = `${timer} ${timer === 1 ? "rok" : "roky"}`;
    timer++;

    if (timer > 5) {
      clearInterval(countdownInterval);
      countdown.style.display = "none";

      startChat(messages2, () => initBuilding(changeToBuilding));
      // ;
    }
  }, 1000);
};

const changeToBuilding = () => {
  const elements = [slider, footer];

  elements.forEach((element) => {
    element.style.display = "block";
    updateElement(layers.length);
  });
};

const handleClick = (messages, callback) => {
  const message = messages.shift();
  if (message) {
    addMessage(message);
  } else {
    document.removeEventListener("click", handleClickWrapper);
    clearMessages();
    chat.style.display = "none";
    callback();
  }
};

const handleClickWrapper = () => {
  handleClick(currentMessages, currentCallback);
};

const startChat = (messages, callback) => {
  addMessage(messages[0]);
  messages.shift();

  currentMessages = messages;
  currentCallback = callback;

  document.addEventListener("click", handleClickWrapper);
};

startChat(messages1, startCountdown);
