import Navbar from "../components/navbar.js";
import GameFunctions from "../components/game-functions.js";

const GamePage = () => {
  return (
    `
    <section>
    ` +
    Navbar() +
    GameFunctions() +
    `
    </section>
  `
  );
};

export default GamePage;
