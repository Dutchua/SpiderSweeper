import LogIn from "./src/screens/logIn.js";
import GamePage from "./src/screens/game-page.js";
import HighScorePage from "./src/screens/high-score-page.js";
import Timer from "./src/utils/Timer.js";
import { sendHello } from "./src/api/interface.js";
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
  const response = sendHello();
  console.log(response);
  const initialHash = window.location.hash || "#login-page";
  navigateTo(initialHash);
};

window.addEventListener("hashchange", () => {
  navigateTo(window.location.hash);
});

document.addEventListener("DOMContentLoaded", handleInitialLoad);

const addEventListenersToDynamicElements = () => {
  createButtons();
};

const addButtonEvent = (button, hash) => {
  if (button.id === "login" && (hash === "__start__" || hash === "#game")) {
    button.addEventListener("click", () => {
      oauthSignIn();
      navigateTo("#game");
      timer.reset();
      timer.start();
    });
    return;
  } else {
    button.addEventListener("click", () => {
      navigateTo(hash);
    });
  }
};

const createButtons = () => {
  const loginButton = document.getElementById("login");
  const logoutButton = document.getElementById("logout");
  const highScoreButton = document.getElementById("highscore");
  const startButton = document.getElementById("start");
  const playButton = document.getElementById("play");
  const miniStartButton = document.getElementById("start-mini");
  const miniPlayButton = document.getElementById("play-mini");
  const miniHighScoreButton = document.getElementById("highscore-mini");
  const miniLogoutButton = document.getElementById("login-mini");

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
