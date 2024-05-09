import HighScoreTable from "../components/highscoretable.js";
import { NavbarHighScorePage } from "../components/navbar.js";
import { DummyHighScores } from "../dummy.js";

const HighScorePage = () => {
  return (
    `<section id="highscores" class="page">` +
    NavbarHighScorePage() +
    HighScoreTable(DummyHighScores.highScores) +
    `</section>`
  );
};

export default HighScorePage;
