import HighScoreTable from "../components/highscoretable.js";
import {
  NavbarHighScorePage,
  NavbarHighScorePageMini,
  SmallNavbar
} from "../components/navbar.js";
import { DummyHighScores } from "../dummy.js";

const HighScorePage = () => {
  return (
    `<section id="highscores" class="page">
    ` +
    NavbarHighScorePage() +
    NavbarHighScorePageMini() +
    SmallNavbar() +
    HighScoreTable(DummyHighScores.highScores) +
    `
    </section>`
  );
};

export default HighScorePage;
