import { formattedDate } from "../utils/format.js";
const HighScoreTable = (highScores) => {
  const scores = highScores
    .map((score, index) => {
      const date = new Date(score.tmstamp);
      formattedDate(date);
      return `<tr>
    <td class="HighScoreText">High Score ${index + 1}:</td>
    <td>${score.Score}</td>
    <td>${formattedDate}</td>
    </tr>`;
    })
    .join("");
  return `<section class="cover column"><table id="HighScoreTable">${scores}</table></section>`;
};

export default HighScoreTable;
