import LogIn from "./src/screens/logIn.js";
import GamePage from "./src/screens/game-page.js";
import HighScorePage from "./src/screens/high-score-page.js";
import Timer from "./src/utils/Timer.js";
import { oauthSignIn } from "./src/api/oauth.js";
import { getHighScores, makeMove, startGame } from "./src/api/interface.js";
import { Loader } from "./src/components/tiles.js";

const root = document.querySelector("main");

const routes = {
  "#login-page": LogIn,
  "#highscores": HighScorePage,
  "#game": GamePage,
};

const timer = new Timer();

window.handleTileClick = async (row, col) => {
  try {
    render(GamePage(undefined, undefined, true));
    const { board, condition } = await makeMove(row, col);

    if (condition === "won") {
      const timeTaken = timer.stop();

      // TODO: Show a winning message to the user

      return;
    } else if (condition === "lost") {
      timer.stop();
      return;
    }

    // continue, thus update the grid
    await renderGamePage(board);
  } catch (error) {
    // TODO: Show an error message to the user
    console.error(error);
  }
};

const render = (html) => {
  const wrapper = document.createElement("section");
  wrapper.insertAdjacentHTML("beforeend", html);

  while (wrapper.firstChild) {
    root.replaceChildren();
    root.appendChild(wrapper.firstChild);
  }

  addEventListenersToDynamicElements();
};

const renderGamePage = async (grid) => {
  try {
    render(GamePage(grid, undefined, true));
    const highScores = await getHighScores();

    render(GamePage(grid, highScores));
  } catch (error) {
    render(`<h3>${error.message}</h3>`);
  }
};

const navigateTo = async (hash) => {
  switch (hash) {
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
  const screenHTML = await screenComponent();

  const wrapper = document.createElement("section");
  wrapper.replaceChildren("beforeend", screenHTML);

  while (wrapper.firstChild) {
    root.appendChild(wrapper.firstChild);
  }

  addEventListenersToDynamicElements();
};

const handleInitialLoad = async () => {
  const username = sessionStorage.getItem("username");
  console.log(username);
  if (username) {
    window.location.hash = "#game";
    render(Loader());
    const grid = await startGame();
    await renderGamePage(grid);
    timer.reset();
    timer.start();
    return;
  }
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

// const stopGameButton = document.getElementById("logout");

// stopGameButton.addEventListener("click", () => {
//   winningCondition = true;
//   losingCondition = true;
// });
