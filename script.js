const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let current = "0";

function updateDisplay() {
  display.textContent = current;
}

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const value = btn.textContent.trim();

    // AC
    if (btn.classList.contains("ac")) {
      current = "0";
      updateDisplay();
      return;
    }

    // DEL
    if (btn.classList.contains("del")) {
      current = current.length > 1 ? current.slice(0, -1) : "0";
      updateDisplay();
      return;
    }

    // First input replace 0
    if (current === "0") {
      current = value;
    } else {
      current += value;
    }

    updateDisplay();
  });
});

