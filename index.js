import { layers } from "./layers.js";

let userInteracted = false;

const rangeSlider = () => {
  const svgImages = document.querySelectorAll(".building-layer");
  const rangeEl = document.querySelector(".range-slider__range");
  const valueEl = document.querySelector(".range-slider__value");
  const rangeWidth = rangeEl.offsetWidth;
  const thumbWidth = 20;
  const max = rangeEl.max;
  const min = rangeEl.min;

  const updateImages = (value) => {
    valueEl.textContent = layers[value - 1]?.name;
    const left = ((value - min) / (max - min)) * (rangeWidth - thumbWidth);

    rangeEl.value = value;
    valueEl.style.left = `${left}px`;

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

    updateImages(value);
  });

  svgImages.forEach((img, index) => {
    const imgId = parseInt(img.id.replace("layer", ""), 10);

    setTimeout(() => {
      if (!userInteracted) {
        updateImages(imgId);
      }
    }, index * 1000);
  });
};

rangeSlider();
