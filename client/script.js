// import Navbar from "./src/components/navbar.js";
import LogIn from "./src/screens/logIn.js";
import GamePage from "./src/screens/game-page.js";
import Timer from "./src/utils/Timer.js";

const root = document.getElementById("root");
root.innerHTML = GamePage();

// Usage example:
const timer = new Timer();
timer.start();

let winningCondition = false;
let losingCondition = false;

// Stop the timer when the NewGame button is clicked
const newGameButton = document.getElementById("start");
const stopGameButton = document.getElementById("logout");
newGameButton.addEventListener("click", () => {
  timer.stop();
});

stopGameButton.addEventListener("click", () => {
  winningCondition = true;
  losingCondition = true;
});

// Stop the timer when a winning/losing condition is passed in
function checkWinningCondition() {
  // Your winning condition logic here
  if (winningCondition) {
    timer.stop();
  }
}

function checkLosingCondition() {
  // Your losing condition logic here
  if (losingCondition) {
    timer.stop();
  }
}

// Call the checkWinningCondition and checkLosingCondition functions periodically
setInterval(() => {
  checkWinningCondition();
  checkLosingCondition();
}, 1000);

// const loginButtonTag = document.getElementById("login");

// loginButtonTag.addEventListener("click", () => {
//   root.innerHTML = GamePage();
// });
