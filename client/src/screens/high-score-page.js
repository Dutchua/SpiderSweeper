import HighScoreTable from "../components/highscoretable.js";
import {
  NavbarHighScorePage,
  NavbarHighScorePageMini,
} from "../components/navbar.js";
import { DummyHighScores } from "../dummy.js";

const HighScorePage = () => {
  return (
    `<section>` +
    NavbarHighScorePage() +
    NavbarHighScorePageMini() +
    HighScoreTable(DummyHighScores.highScores) +
    `</section>`
  );
};

export default HighScorePage;
