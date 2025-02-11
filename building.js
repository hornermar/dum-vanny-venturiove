import { layers } from "./data/layers.js";

let userInteracted = false;
const svgImages = document.querySelectorAll(".building-layer");
const sliderInput = document.querySelector(".slider--input");
const elementDescription = document.querySelector(".message-text");

const updateSvg = (value) => {
  svgImages.forEach((img) => {
    const imgId = parseInt(img.id.replace("layer", ""), 10);

    if (imgId <= value) {
      img.style.bottom = "35px";
    } else {
      img.style.bottom = "1200px";
    }
  });
};

export const updateElement = (value) => {
  const layer = layers[value - 1];
  if (layer) {
    elementDescription.innerHTML = `<b>${layer.name}</b>: ${layer.description}`;
  }

  sliderInput.value = value;

  updateSvg(value);
};

sliderInput.addEventListener("input", () => {
  const value = parseInt(sliderInput.value, 10);

  updateElement(value);
});

export const initBuilding = (callback) => {
  let completedTimeouts = 0;
  const totalTimeouts = svgImages.length;

  document.addEventListener("click", () => {
    userInteracted = true;
  });

  svgImages.forEach((img, index) => {
    const imgId = parseInt(img.id.replace("layer", ""), 10);

    setTimeout(() => {
      updateSvg(imgId);
      completedTimeouts++;

      if (completedTimeouts === totalTimeouts) {
        setTimeout(() => {
          callback();
        }, 1000);
      }
    }, index * 200);
  });
};
