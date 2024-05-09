export const fetchhighscores = async () => {
    let data = await fetch("http://spidersweeperapp-env.eba-jpuqcsfx.eu-west-1.elasticbeanstalk.com/highscores",
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
      console.log(sessionStorage.getItem("token"))
      console.log("THIS IS A RESPONSE: " + response["message"])
      return response.json();
    })
    .then((data) => {
      console.log("This is the data I want: " + data["scores"]);
      return data["scores"];
    })
  return data
}