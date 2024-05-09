import LogIn from "./src/screens/logIn.js";
import GamePage from "./src/screens/game-page.js";
import Timer from "./src/utils/Timer.js";
import HighScorePage from "./src/screens/high-score-page.js";

const root = document.getElementById("root");

// create Element Login and append to root

//root.appendChild(LogIn());
 root.innerHTML = GamePage("01:32");
// root.innerHTML = HighScorePage();

// document.addEventListener("DOMContentLoaded", function () {
//   // Check if authenticated

//   const navigateTo = (hash) => {
//     document.querySelectorAll(".page").forEach((page) => {
//       page.classList.remove("active");
//     });

//     const targetPage = document.querySelector(hash);
//     if (targetPage) {
//       targetPage.classList.add("active");
//     } else {
//       document.querySelector("#login").classList.add("active");
//     }
//   };

//   const handleInitialLoad = () => {
//     const initialHash = window.location.hash || "#login";
//     console.log(initialHash);
//     navigateTo(initialHash);
//   };

//   window.addEventListener("hashchange", function () {
//     navigateTo(window.location.hash);
//   });

//   handleInitialLoad();
// });
