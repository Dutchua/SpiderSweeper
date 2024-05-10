import { formattedDate } from "../utils/format.js";
const HighScoreTable = (highScores) => {
  if (highScores.length === 0) {
    return `<section class="margin cover center"><h3 style="margin-top: 10rem">You probably won't touch grass after you start playing this game.</h3></section>`;
  }

  const scores = highScores
    .map((score, index) => {
      const date = new Date(score.tmstamp);
      return `<tr>
    <td class="HighScoreText">High Score ${index + 1}:</td>
    <td>${score.Score}</td>
    <td>${formattedDate(date)}</td>
    </tr>`;
    })
    .join("");
  return `<section class="cover column"><table id="HighScoreTable">${scores}</table></section>`;
};

export default HighScoreTable;
