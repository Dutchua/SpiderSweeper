import Navbar from "./src/components/navbar.js";

const click = document.getElementById("btn");
const root = document.getElementById("root");

click.addEventListener("click", () => {
  console.log("Button clicked");
  root.innerHTML = Navbar();
});
