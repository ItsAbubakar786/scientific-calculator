const display = document.getElementById("display");
const displayInput = document.getElementById("displayInput");
const buttons = document.querySelectorAll(".btn");

let currentInput = "0";
let previousInput = null;
let operator = null;
let shouldResetScreen = false;

function updateDisplay() {
  display.textContent = currentInput;
}

function updateExpression() {
  if (previousInput && operator) {
    displayInput.textContent = previousInput + " " + operator;
  } else {
    displayInput.textContent = "";
  }
}

function calculate() {
  if (previousInput === null || operator === null) return;

  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);
  let result = 0;

  switch (operator) {
    case "+":
      result = prev + current;
      break;
    case "−":
      result = prev - current;
      break;
    case "×":
      result = prev * current;
      break;
    case "÷":
      result = current === 0 ? "Error" : prev / current;
      break;
  }

  currentInput = result.toString();
  previousInput = null;
  operator = null;
  displayInput.textContent = "";
}

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const value = btn.textContent.trim();

    // AC
    if (btn.classList.contains("ac")) {
      currentInput = "0";
      previousInput = null;
      operator = null;
      displayInput.textContent = "";
      updateDisplay();
      return;
    }

    // DEL
    if (btn.classList.contains("del")) {
      currentInput =
        currentInput.length > 1
          ? currentInput.slice(0, -1)
          : "0";
      updateDisplay();
      return;
    }

    // =
    if (btn.classList.contains("equal")) {
      calculate();
      updateDisplay();
      shouldResetScreen = true;
      return;
    }

    // Operators
    if (btn.classList.contains("operator")) {
      operator = value;
      previousInput = currentInput;
      shouldResetScreen = true;
      updateExpression();
      return;
    }

    // Numbers / dot
    if (shouldResetScreen) {
      currentInput = value;
      shouldResetScreen = false;
    } else {
      currentInput =
        currentInput === "0"
          ? value
          : currentInput + value;
    }

    updateDisplay();
  });
});