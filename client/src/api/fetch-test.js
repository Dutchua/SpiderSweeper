export const fetchhighscores = async () => {
  let data = await fetch(
    "http://spidersweeperapp-env.eba-jpuqcsfx.eu-west-1.elasticbeanstalk.com/highscores",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("token"),
        "Access-Control-Allow-Origin": "*",
      },
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data["scores"];
    });
  return data;
};
