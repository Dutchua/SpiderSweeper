export const getHighScores = async () => {
  const response = await fetch("http://localhost:8080/highscores");
  return response.json();
};

export const postHighScore = async (highScore) => {
  const response = await fetch("http://localhost:8080/highscores", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(highScore),
  });
  return response.json();
};

export const getUser = async () => {
  const response = await fetch("http://localhost:8080/sign-in");
  return response.json();
};

export const getGame = async (user) => {
  const response = await fetch("http://localhost:8080/game", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return response.json();
};
