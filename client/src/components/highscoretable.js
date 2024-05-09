import { HighScoreButton, HighScoreButtonMini} from "./button.js";

const HighScoreTable = () => {
    return (
      `<section  id="GameFunctions" class="space-between background">
      <section class="row">` +
      StopWatch() +l
      FlagCount({ count: 10 }) +
      `</section>` +
      NewGameButton() +
      `
  </section>`
  `<section>` + 
    `<table id="HighScoreTable">
        <tr>
            <td class="HighScoreText">High Score 1:</td>
            <td>01:15</td>
            <td>2024/05/07</td>
        </tr>
        <tr>
            <td class="HighScoreText">High Score 2:</td>
            <td>--</td>
            <td>--</td>
        </tr>
        </table>` +
    `</section>`
    );
  };

  export default HighScoreTable;