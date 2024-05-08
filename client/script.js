// import Navbar from "./src/components/navbar.js";
import LogIn from "./src/screens/logIn.js";
import GamePage from "./src/screens/game-page.js";

const root = document.getElementById("root");
root.innerHTML = GamePage();

const loginButtonTag = document.getElementById("login");

loginButtonTag.addEventListener("click", () => {
  root.innerHTML = GamePage();
});
