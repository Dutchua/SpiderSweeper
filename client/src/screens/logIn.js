import { LoginButton } from "../components/button.js";

const LogIn = () => {
  const loginButton = LoginButton();
  return (
    `<section class="column">
      <img id="spider" src="./public/assets/hanging-logo.png" alt="spider" />
      <h1 >Welcome To Spider Sweeper</h1>
      ` +
    loginButton +
    `
    </section>`
  );
};
// class="creepster-regular"

export default LogIn;
