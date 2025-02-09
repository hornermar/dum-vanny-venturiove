import { layers } from "./layers.js";

let userInteracted = false;

const rangeSlider = () => {
  const svgImages = document.querySelectorAll(".building-layer");
  const rangeEl = document.querySelector(".range-slider__range");
  const element = document.querySelector(".element");
  const elementDescription = document.querySelector(".element-description");

  // const valueEl = document.querySelector(".range-slider__value");
  const rangeWidth = rangeEl.offsetWidth;
  const thumbWidth = 20;
  const max = rangeEl.max;
  const min = rangeEl.min;

  const updateElement = (value) => {
    // valueEl.textContent = layers[value - 1]?.name;
    element.textContent = layers[value - 1]?.name;
    elementDescription.textContent = layers[value - 1]?.description || "";
    const left = ((value - min) / (max - min)) * (rangeWidth - thumbWidth);

    rangeEl.value = value;
    // valueEl.style.left = `${left}px`;

    svgImages.forEach((img) => {
      const imgId = parseInt(img.id.replace("layer", ""), 10);

      if (imgId <= value) {
        img.style.bottom = "35px";
      } else {
        img.style.bottom = "1200px";
      }
    });
  };

  rangeEl.addEventListener("input", (e) => {
    userInteracted = true;
    const value = parseInt(rangeEl.value, 10);

    updateElement(value);
  });

  svgImages.forEach((img, index) => {
    const imgId = parseInt(img.id.replace("layer", ""), 10);

    setTimeout(() => {
      if (!userInteracted) {
        updateElement(imgId);
      }
    }, index * 500);
  });
};

rangeSlider();
