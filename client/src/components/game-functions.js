import { NewGameButton } from "./button.js";
import FlagCount from "./flag-count.js";
import StopWatch from "./stopwatch.js";

const GameFunctions = () => {
  return (
    `<section  id="GameFunctions" class="space-between background row">
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
