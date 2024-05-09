import HighScoreTable from "../components/highscoretable.js";
import {
  NavbarHighScorePage
} from "../components/navbar.js";
import { DummyHighScores } from "../dummy.js";
import { HowToPlayDialog } from "../components/howtoplay.js";

const HighScorePage = () => {
  return (
    `<section id="highscores" class="page">
    ` +
    NavbarHighScorePage() +
    HowToPlayDialog() +
    HighScoreTable(DummyHighScores.highScores) +
    `
    </section>`
  );
};

export default HighScorePage;

