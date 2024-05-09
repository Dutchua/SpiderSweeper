import { LoginButton } from "../components/button.js";

const LogIn = () => {
  return `<section id="login-page" class="column page">
      <img id="spider" src="./public/assets/hanging-logo.png" alt="spider" />
      <h1 class="creepster-regular">Welcome To Spider Sweeper</h1>
      ${LoginButton()} 
    </section>`;
};

export default LogIn;
