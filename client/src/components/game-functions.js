import { NewGameButton, HighScoreButtonMini } from "./button.js";
import FlagCount from "./flag-count.js";
import StopWatch from "./stopwatch.js";

const GameFunctions = () => {
  return (
    `<section  id="GameBoard" class="space-between background">
    <section class="row">` +
    StopWatch() +
    FlagCount({ count: 10 }) +
    `</section>` +
    NewGameButton() +
    `
</section>`
  );
};

export default GameFunctions;
