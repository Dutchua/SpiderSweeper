import { NavbarGamePage } from "../components/navbar.js";
import GameFunctions from "../components/game-functions.js";
import Grid from "../components/grid.js";
import { HowToPlayDialog } from "../components/howtoplay.js";
import { Loader } from "../components/tiles.js";
import { GameWonDialog } from "../components/gamewon.js";
import { GameLostDialog } from "../components/gamelost.js";

const GamePage = (grid, score, loading = false) => {
  if (loading) {
    return (
      `<section id="game" class="page">
      ` +
      NavbarGamePage() +
      `<section class="cover center"><section class="column">
      ` +
      Loader() +
      GameWonDialog() +
      GameLostDialog() +
      `</section>
      </section>
      </section>`
    );
  }

  const highScoresHTML =
    score !== undefined ? `<label id="Score">High Score: ${score}</label>` : "";

  return (
    `
    <section id="game" class="page">
    ` +
    NavbarGamePage() +
    `<section class="cover center"><section class="column">` +
    GameFunctions() +
    HowToPlayDialog() +
    Grid(grid) +
    highScoresHTML +
    GameWonDialog() +
    GameLostDialog() +
    `</section>
    </section>
    </section>`
  );
};

export default GamePage;
