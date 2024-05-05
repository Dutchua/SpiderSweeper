import { LoginButton } from "../components/button.js";

const LogIn = () => {
  const loginButton = LoginButton();
  return (
    `<section class="column">
      <img id="spider" src="./public/assets/hanging-logo.png" alt="spider" />
      <h1 class="creepster-regular">Welcome To Spider Sweeper</h1>
      ` +
    loginButton +
    `
    </section>`
  );
};

export default LogIn;
