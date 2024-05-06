import Navbar from "../components/navbar.js";
import GameFunctions from "../components/game-functions.js";

const GamePage = () => {
  return (
    `
    <section>
    ` +
    Navbar() +
    `<section class="cover center">` +
    GameFunctions() +
    `</section>
    </section>
  `
  );
};

export default GamePage;
