export const LoginButton = () => {
  return `<button class="button" id="login">Log In With Google</button>`;
};

export const LogoutButton = () => {
  return `<button class="button logout row" id="logout" onclick='logout'>
  <img class="icon nav-icon" src="./public/icons/logout-icon.svg" alt="icon" />
  <p class="button-text">Log Out<p>
  </button>`;
};

export const HighScoreButton = () => {
  return `<button class="button row" id="highscore">
  <img class="icon nav-icon" src="./public/icons/star.svg" alt="icon" />
  <p class="button-text">High Scores<p>
</button>`;
};

export const NewGameButton = () => {
  return `<button class="button max-nav" id="start">
  <img class="icon" src="./public/icons/restart.svg" alt="icon" />
  <p class="button-text-New-Game">New Game<p>
  </button>`;
};

export const PlayGameButton = () => {
  return `<button class="button row" id="play">
  <img class="icon" src="./public/icons/home.svg" alt="icon" />
  <p class="button-text">Play Game<p>
  </button>`;
};

export const GameRuleButton = () => {
  return `<button class="button row" id="rule">
  <img class="icon" src="./public/icons/howto-icon.svg" alt="icon" />
  <p class="button-text">Game Rules<p>
  </button>`;
};

export const CloseDiaglog = () => {
  return `<button autofocus id="close-dialog-button">Close</button>`;
};

export const CloseWinDialog = () => {
  return `<button autofocus id="close-win-dialog" class="close-dialog-button">Close</button>`
}
export const CloseLoseDialog = () => {
  return `<button autofocus id="close-lose-dialog" class="close-dialog-button">Close</button>`
}