const API_BASE_URL =
  "http://spidersweeperapp-env.eba-jpuqcsfx.eu-west-1.elasticbeanstalk.com";

export const getHighScores = async () => {
  const response = await fetch(`${API_BASE_URL}/highscores`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${sessionStorage.getItem("token")}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch high scores");
  }

  const result = await response.json();

  if (!Array.isArray(result.scores)) {
    throw new Error("Failed to fetch high scores");
  }

  return result.scores;
};

export const sendHello = async () => {
  const response = await fetch(`${API_BASE_URL}/hello`);
  return response.json();
};

export const postHighScore = async (highScore) => {
  const response = await fetch(`${API_BASE_URL}/new-score`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${sessionStorage.getItem("token")}`,
    },
    body: JSON.stringify({ highScore: highScore }),
  });
  return response.json();
};

export const getUser = async () => {
  const response = await fetch("http://localhost:8080/sign-in");
  return response.json();
};

export async function startGame() {
  const response = await fetch(`${API_BASE_URL}/new-game`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${sessionStorage.getItem("token")}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to start a new game");
  }

  const result = await response.json();

  return result;
}

export const getGame = async (user) => {
  const response = await fetch(`${API_BASE_URL}/game`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${sessionStorage.getItem("token")}`,
    },
    body: JSON.stringify(user),
  });
  return response.json();
};
