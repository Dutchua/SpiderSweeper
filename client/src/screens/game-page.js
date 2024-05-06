import Navbar from "../components/navbar.js";
import GameFunctions from "../components/game-functions.js";
import Grid from "../components/grid.js";
import { DummyData } from "../dummy.js";

const GamePage = () => {
  const gridHTML = {
    grid: DummyData.grid,
  };

  return (
    `
    <section>
    ` +
    Navbar() +
    `<section class="cover center column">` +
    GameFunctions() +
    Grid(gridHTML) +
    `</section>
    </section> 
  `
  );
};

export default GamePage;
