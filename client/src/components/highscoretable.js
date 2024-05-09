const HighScoreTable = async (highScoresPromise) => {

  const highScores = await highScoresPromise;
  
  // if (highScores.length === 0) {
  //   return `<section class="cover column">You probably won't touch grass after you start playing this game</section>`;
  // }
  console.log(highScores)
  const scores = highScores.map((score, index) => {
    console.log(score, index);
    const date = new Date(score.tmstamp);
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
    console.log(date, formattedDate);
    return `<tr>
    <td class="HighScoreText">High Score ${index + 1}:</td>
    <td>${score.Score}</td>
    <td>${formattedDate}</td>
    </tr>`;
  }).join("");
  console.log(scores);
  return `<section class="cover column"><table id="HighScoreTable">${scores}</table></section>`;
};

export default HighScoreTable;
