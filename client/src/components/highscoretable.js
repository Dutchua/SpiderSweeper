const HighScoreTable = (highScores) => {
  const scores = highScores.map((score) => {
    return `<tr>
    <td class="HighScoreText">High Score ${score.id + 1}:</td>
    <td>${score.score}</td>
    <td>${score.date}</td>
    </tr>`;
  });
  return `<section class="cover column"><table id="HighScoreTable">${scores.join(
    ""
  )}</table></section>`;
};

export default HighScoreTable;
