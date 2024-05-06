import { NewGameButton } from "./button.js";
import FlagCount from "./flag-count.js";
import StopWatch from "./stopwatch.js";

const GameFunctions = () => {
  return (
    `<section id="gameboardfunctions">` +
    StopWatch() +
    FlagCount({ count: 10 }) +
    NewGameButton() +
    `
</section>`
  );
};

export default GameFunctions;
