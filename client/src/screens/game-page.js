import { NavbarGamePage } from "../components/navbar.js";
import GameFunctions from "../components/game-functions.js";
import Grid from "../components/grid.js";
import { HowToPlayDialog } from "../components/howtoplay.js";
import { Loader } from "../components/tiles.js";

const GamePage = (grid, score, loading = false) => {
  if (loading) {
    return (
      `<section id="game" class="page">
      ` +
      NavbarGamePage() +
      `<section class="cover center"><section class="column">
      ` +
      Loader() +
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
    `</section>
    </section>
    </section>`
  );
};

export default GamePage;
