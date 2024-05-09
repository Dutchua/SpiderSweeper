import {
  LogoutButton,
  HighScoreButton,
  PlayGameButton
} from "./button.js";

import UserInfo from "./user-info.js";

export const NavbarGamePage = () => {
  return (
    `<nav class="space-between max-nav row">
  ` +
    UserInfo() +
    `
  <section class="row">
    ` +
    HighScoreButton() +
    LogoutButton() +
    `
  </section>
</nav>`
  );
};

export const NavbarHighScorePage = () => {
  return (
    `<nav class="space-between max-nav row">
    ` +
    UserInfo() +
    `
  <section class="row">
    ` +
    PlayGameButton() +
    LogoutButton() +
    `
  </section>
</nav>`
  );
};

