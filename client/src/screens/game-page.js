import { NavbarGamePage} from "../components/navbar.js";
import GameFunctions from "../components/game-functions.js";
import Grid from "../components/grid.js";
import { DummyData } from "../dummy.js";
import { HowToPlayDialog } from "../components/howtoplay.js";
import { GameWonDialog } from "../components/gamewon.js";
import { GameLostDialog } from "../components/gamelost.js";

const GamePage = (score) => {
  const gridHTML = {
    grid: DummyData.grid,
  };

  return (
    `
    <section id="game" class="page">
    ` +
    NavbarGamePage() +
    `<section class="cover center"><section class="column">` +
    GameFunctions() +
    HowToPlayDialog() +
    GameWonDialog() + 
    GameLostDialog() +
    Grid(gridHTML) +
    `<label id="Score">High Score: ${score}</label>
    </section>
    </section>
    </section>`
  );
};

export default GamePage;
