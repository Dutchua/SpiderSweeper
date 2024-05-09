import LogIn from "./src/screens/logIn.js";
import GamePage from "./src/screens/game-page.js";
import HighScorePage from "./src/screens/high-score-page.js";
import Timer from "./src/utils/Timer.js";
import { handleRedirect, oauthSignIn } from "./src/api/oauth.js";
import {
  getHighScores,
  makeMove,
  postHighScore,
  startGame,
} from "./src/api/interface.js";
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
      await postHighScore(timeTaken);
      render(GamePage([], undefined));
      const winDialog = document.getElementById("winner-dialog");
      winDialog.showModal();
      const closeWinDiaglog = document.getElementById("close-win-dialog");
      closeWinDiaglog.addEventListener("click", () => {
        winDialog.close();
        handleInitialLoad();
      });

      return;
    } else if (condition === "lost") {
      render(GamePage([], undefined));
      const loseDialog = document.getElementById("loser-dialog");
      loseDialog.showModal();
      const closeLoseDiaglog = document.getElementById("close-lose-dialog");
      closeLoseDiaglog.addEventListener("click", () => {
        loseDialog.close();
        handleInitialLoad();
      });
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
    const highScore = highScores.reduce((acc, score) => {
      if (score < acc) {
        return score;
      }

      return acc;
    }, Number.MAX_VALUE);

    const showScore = highScore !== Number.MAX_VALUE;
    const visibleHighScore = showScore ? highScore : undefined;

    render(GamePage(grid, visibleHighScore));
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

  render(screenHTML);
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

document.addEventListener("DOMContentLoaded", handleInitialLoad);

const addEventListenersToDynamicElements = () => {
  createButtons();
};

const addButtonEvent = (button, hash) => {
  button.addEventListener("mousedown", (e) => {
    e.preventDefault();
    if (e.which === 1) console.log("left click");
    if (e.which === 2) console.log("scroll click");
    if (button.id === "login") {
      oauthSignIn();
      timer.reset();
      timer.start();
      return;
    } else if (hash === "#game") {
      handleInitialLoad();
    } else if (hash === "__start__") {
      timer.reset();
      timer.start();
      return;
    } else if (button.id === "logout") {
      sessionStorage.clear();
      window.location.hash = "#login-page";
      navigateTo("#login-page");
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
  const ruleDialog = document.getElementById("rule-dialog");
  const closeRuleDialogButton = document.getElementById("close-rule-dialog");

  if (gameRuleButton) {
    gameRuleButton.addEventListener("click", () => {
      console.log("button clicked");
      timer.pause();
      ruleDialog.showModal();
    });
  }

  if (closeRuleDialogButton) {
    closeRuleDialogButton.addEventListener("click", () => {
      timer.resume();
      ruleDialog.close();
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

if (location.hash.includes("state")) {
  await handleRedirect();
  await handleInitialLoad();
}
