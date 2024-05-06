import LogIn from "./src/screens/logIn.js";
import GamePage from "./src/screens/game-page.js";
import Timer from "./src/utils/Timer.js";

const root = document.getElementById("root");
root.innerHTML = GamePage();

const timer = new Timer();
timer.start();

let winningCondition = false;
let losingCondition = false;

const newGameButton = document.getElementById("start");
const stopGameButton = document.getElementById("logout");
newGameButton.addEventListener("click", () => {
  timer.reset();
  timer.start();
});

stopGameButton.addEventListener("click", () => {
  winningCondition = true;
  losingCondition = true;
});

function checkWinningCondition() {
  if (winningCondition) {
    timer.stop();
  }
}

function checkLosingCondition() {
  if (losingCondition) {
    timer.stop();
  }
}

setInterval(() => {
  checkWinningCondition();
  checkLosingCondition();
}, 1000);
