import { NewGameButton } from "./button.js";
import StopWatch from "./stopwatch.js";

const GameFunctions = () => {
  return (
    `<section  id="GameFunctions" class="space-between background row">
    <section class="row">` +
    StopWatch() +
    `</section>` +
    NewGameButton() +
    `
</section>`
  );
};

export default GameFunctions;
