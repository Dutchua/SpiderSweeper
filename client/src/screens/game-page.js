import { NavbarGamePage } from "../components/navbar.js";
import GameFunctions from "../components/game-functions.js";
import Grid from "../components/grid.js";
import { DummyData } from "../dummy.js";
import { HowToPlayDialog } from "../components/howtoplay.js";
import { getHighScores, startGame } from "../api/interface.js";

const GamePage = async (score) => {
  const gridHTML = {
    grid: DummyData.grid,
  };

  try {
    await startGame();

    const highScores = await getHighScores();

    const highScoresHTML =
      highScores.length > 0
        ? `<label id="Score">High Score: ${score}</label>`
        : "";
    return (
      `
      <section id="game" class="page">
      ` +
      NavbarGamePage() +
      `<section class="cover center"><section class="column">` +
      GameFunctions() +
      HowToPlayDialog() +
      Grid(gridHTML) +
      highScoresHTML +
      `</section>
      </section>
      </section>`
    );
  } catch (error) {
    // return an error message
    return (
      `<section id="game" class="page">` +
      NavbarGamePage() +
      `<section class="cover center"><section class="column">` +
      GameFunctions() +
      HowToPlayDialog() +
      `<h3>${error.message}</h3>` +
      `</section>
      </section>
      </section>`
    );
  }
};

export default GamePage;
