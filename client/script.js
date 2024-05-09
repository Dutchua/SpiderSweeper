import LogIn from "./src/screens/logIn.js";
import GamePage from "./src/screens/game-page.js";
import HighScorePage from "./src/screens/high-score-page.js";

const root = document.querySelector("main");

const routes = {
  "#login-page": LogIn,
  "#highscores": HighScorePage,
  "#game": GamePage,
};

// Check if authenticated
const navigateTo = (hash) => {
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
  button.addEventListener("click", () => {
    navigateTo(hash);
  });
};

const createButtons = () => {
  const loginButton = document.getElementById("login");
  const logoutButton = document.getElementById("logout");
  const highScoreButton = document.getElementById("highscore");
  const startButton = document.getElementById("start");
  const playButton = document.getElementById("play");

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
};
