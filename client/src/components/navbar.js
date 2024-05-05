import { LogoutButton, HighScoreButton } from "./button.js";

const Navbar = () => {
  const logout = LogoutButton();
  return (
    `<nav class="row">
  <section id="UserInfo" class="row">
    <img id="Icon" src="./public/assets/profile-default.png" alt="User" />
    <h2 id="Username">Username</h2>
  </section>
  <section class="row">
    ` +
    HighScoreButton() +
    logout +
    `
  </section>
</nav>`
  );
};

export default Navbar;
