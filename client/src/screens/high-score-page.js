import HighScoreTable from "../components/highscoretable.js";
import { NavbarHighScorePage } from "../components/navbar.js";
import { DummyHighScores } from "../dummy.js";

const HighScorePage = () => {
  return (
    `<section>` +
    NavbarHighScorePage() +
    HighScoreTable(DummyHighScores.highScores) +
    `</section>`
  );
};

export default HighScorePage;
