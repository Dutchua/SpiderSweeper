import { NavbarGamePage, NavbarGamePageMini, SmallNavbar } from "../components/navbar.js";
import GameFunctions from "../components/game-functions.js";
import Grid from "../components/grid.js";
import { DummyData } from "../dummy.js";

const GamePage = (score) => {
  const gridHTML = {
    grid: DummyData.grid,
  };

  return (
    `
    <section id="game" class="page">
    ` +
    NavbarGamePage() +
    NavbarGamePageMini() +
    SmallNavbar() +
    `<section class="cover center"><section class="column">` +
    GameFunctions() +
    Grid(gridHTML) +
    `<label id="Score">High Score: ${score}</label>
    </section>
    </section>
    </section> 
  `
  );
};

export default GamePage;
