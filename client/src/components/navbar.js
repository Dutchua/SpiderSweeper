import {
  LogoutButton,
  HighScoreButton,
  GameRuleButton,
  PlayGameButton
} from "./button.js";
import { HowToPlayDialog } from "./howtoplay.js";

import UserInfo from "./user-info.js";

export const NavbarGamePage = () => {
  return (
    `<nav class="space-between max-nav row">
  ` +
    UserInfo() +
    `
  <section class="row">
    ` +
    GameRuleButton() +
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
    GameRuleButton() +
    PlayGameButton() +
    LogoutButton() +
    `
  </section>
</nav>`
  );
};

