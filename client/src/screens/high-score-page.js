import HighScoreTable from "../components/highscoretable.js";
import { NavbarHighScorePage } from "../components/navbar.js";
import { DummyHighScores } from "../dummy.js";
import { HowToPlayDialog } from "../components/howtoplay.js";
import { fetchhighscores } from "../api/fetch-test.js";

const HighScorePage = async () => {
  return (
    `<section id="highscores" class="page">
    ` +
    NavbarHighScorePage() +
    HowToPlayDialog() +
    (await HighScoreTable(await fetchhighscores())) +
    `
    </section>`
  );
};

export default HighScorePage;
