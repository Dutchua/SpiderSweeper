import LogIn from "./src/screens/logIn.js";
import GamePage from "./src/screens/game-page.js";
import HighScorePage from "./src/screens/high-score-page.js";
import Timer from "./src/utils/Timer.js";
import { oauthSignIn } from "./src/api/oauth.js";

const root = document.querySelector("main");

const routes = {
  "#login-page": LogIn,
  "#highscores": HighScorePage,
  "#game": GamePage,
};

const timer = new Timer();

const navigateTo = (hash) => {
  switch (hash) {
    case "#game":
      timer.start();
      break;
    case "#login-page":
      timer.reset();
      break;
    case "#highscores":
      timer.reset();
      break;
    default:
      break;
  }
  root.textContent = "";
  const screenComponent = routes[hash] || LogIn;
  const screenHTML = screenComponent();
  const wrapper = document.createElement("section");
  wrapper.insertAdjacentHTML("beforeend", screenHTML);

  while (wrapper.firstChild) {
    root.appendChild(wrapper.firstChild);
  }

  addEventListenersToDynamicElements();
};

const handleInitialLoad = () => {
  const username = sessionStorage.getItem("username");
  console.log(username);
  if (username) {
    window.location.hash = "#game";
    timer.reset();
    timer.start();
  }
  const initialHash = window.location.hash || "#login-page";
  navigateTo(initialHash);
};

window.addEventListener("hashchange", () => {
  if (window.location.hash === "#game") {
    timer.reset();
    timer.start();
    return;
  }
  navigateTo(window.location.hash);
});

document.addEventListener("DOMContentLoaded", handleInitialLoad);

const addEventListenersToDynamicElements = () => {
  createButtons();
};

const addButtonEvent = (button, hash) => {
  button.addEventListener("click", () => {
    if (button.id === "login") {
      oauthSignIn();
      timer.reset();
      timer.start();
      return;
    } else if (hash === "#game") {
      navigateTo("#game");
    } else if (hash === "__start__") {
      timer.reset();
      timer.start();
      return;
    } else {
      navigateTo(hash);
    }
  });
};

const createButtons = () => {
  const loginButton = document.getElementById("login");
  const logoutButton = document.getElementById("logout");
  const highScoreButton = document.getElementById("highscore");
  const startButton = document.getElementById("start");
  const playButton = document.getElementById("play");
  const gameRuleButton = document.getElementById("rule");
  const dialog = document.getElementById("dialog");
  const closeDialogButton = document.getElementById("close-dialog-button");

  if (gameRuleButton) {
    gameRuleButton.addEventListener("click", () => {
      console.log("button clicked");
      timer.pause();
      dialog.showModal();
    });
  }

  if (closeDialogButton) {
    closeDialogButton.addEventListener("click", () => {
      timer.resume();
      dialog.close();
    });
  }

  if (loginButton) {
    addButtonEvent(loginButton, "#game");
  }

  if (logoutButton) {
    addButtonEvent(logoutButton, "#login-page");
  }

  if (highScoreButton) {
    addButtonEvent(highScoreButton, "#highscores");
  }

  if (playButton) {
    console.log(playButton);
    addButtonEvent(playButton, "#game");
  }

  if (startButton) {
    addButtonEvent(startButton, "__start__");
  }
};

let winningCondition = false;
let losingCondition = false;

// const stopGameButton = document.getElementById("logout");

// stopGameButton.addEventListener("click", () => {
//   winningCondition = true;
//   losingCondition = true;
// });
const winDialog = document.getElementById("winner-dialog");
const closeWinDiaglog = document.getElementById("close-win-dialog");

function checkWinningCondition() {
  if (winningCondition == true && losingCondition == false) {
    timer.stop();
    winDialog.showModal();
  }
}

const loseDialog = document.getElementById("loser-dialog");
const closeLoseDiaglog = document.getElementById("close-lose-dialog");

if (closeWinDiaglog) {
  closeWinDiaglog.addEventListener("click", () => {
    winDialog.close();
  });
}

function checkLosingCondition() {
  if (winningCondition == false && losingCondition == true) {
    timer.stop();
    loseDialog.showModal();
  }
}

if (closeLoseDiaglog) {
  closeLoseDiaglog.addEventListener("click", () => {
    loseDialog.close();
  });
}

setInterval(() => {
  checkWinningCondition();
  checkLosingCondition();
}, 1000);
