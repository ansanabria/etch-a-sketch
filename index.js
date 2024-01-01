const sketchpad = document.querySelector(".sketchpad");
let dimensions = 16;
let multicolor = false;

// Helper functions

function colorSketch(pixel, multicolor) {
  let first, second, third;
  if (multicolor) {
    [first, second, third] = randomColorPixel();
  } else {
    [first, second, third] = solidColorPixel(pixel);
  }
  pixel.style.background = `rgb(${first} ${second} ${third})`;
}

function solidColorPixel(pixel) {
  const currentShade = Number(pixel.dataset.shade);
  return [currentShade, currentShade, currentShade];
}

function randomColorPixel() {
  firstRgb = getRandomNumberInRange(0, 255);
  secondRgb = getRandomNumberInRange(0, 255);
  thirdRgb = getRandomNumberInRange(0, 255);
  return [firstRgb, secondRgb, thirdRgb];
}

function getRandomNumberInRange(minimum, maximum) {
  return Math.random() * (maximum - minimum) + minimum;
}

// Main functions (mainly involving the DOM)

const multicolorCheckbox = document.querySelector(".multicolor-checkbox");
multicolorCheckbox.addEventListener("click", (e) => {
  multicolor = true;
});

const dimensionsBtn = document.querySelector(".dimensions-btn");
dimensionsBtn.addEventListener("click", () => {
  const newDimensions = Number(prompt("Enter the new dimensions"));
  if (newDimensions > 100) {
    alert("The limit is 100. Try again!");
  } else {
    cleanGrid();
    renderGrid(sketchpad, newDimensions);
  }
});

function cleanGrid() {
  const rows = document.querySelectorAll(".row-container");
  rows.forEach((row) => row.remove());
}

function changeShade(pixel) {
  const currentShade = Number(pixel.dataset.shade);
  return currentShade - 10;
}

function renderGrid(sketchpad, dimensions) {
  for (let row = 0; row < dimensions; row++) {
    const rowContainer = document.createElement("div");
    rowContainer.classList.add("row-container");
    for (let column = 0; column < dimensions; column++) {
      const pixel = document.createElement("div");
      pixel.setAttribute("data-shade", "100");
      pixel.classList.add("pixel");
      pixel.addEventListener("dragenter", (e) => {
        pixel.setAttribute("data-shade", changeShade(pixel));
        colorSketch(e.currentTarget, multicolor);
      });
      pixel.addEventListener("click", (e) => {
        pixel.setAttribute("data-shade", changeShade(pixel));
        colorSketch(e.currentTarget, multicolor);
      });
      rowContainer.appendChild(pixel);
    }
    sketchpad.appendChild(rowContainer);
  }
}

renderGrid(sketchpad, dimensions);
