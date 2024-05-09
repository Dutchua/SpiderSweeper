import {
  LogoutButton,
  LogoutButtonMini,
  HighScoreButton,
  HighScoreButtonMini,
  PlayGameButton,
  PlayGameButtonMini,
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

export const NavbarGamePageMini = () => {
  return (
    `<nav class="space-between mini-nav row">
    ` +
    UserInfo() +
    `
    <section class="row">
      ` +
    HighScoreButtonMini() +
    LogoutButtonMini() +
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

export const NavbarHighScorePageMini = () => {
  return (
    `<nav class="space-between mini-nav row">
    ` +
    UserInfo() +
    `
  <section class="row">
    ` +
    PlayGameButtonMini() +
    LogoutButtonMini() +
    `
  </section>
</nav>`
  );
};
