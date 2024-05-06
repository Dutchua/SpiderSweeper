export const ClosedTile = () => {
  return `<button class="tile closed"></button>`;
};

export const NumberTile = ({ value }) => {
  return `<button class="tile open">${value}</button>`;
};

export const FlagTile = () => {
  return `<button class="tile open flag"><img class="icon" src="./public/icons/newspaper.svg" alt="icon" /></button>`;
};

export const MineTile = () => {
  return `<button class="tile open mine">
  <img class="icon" src="./public/icons/spider.svg" alt="icon" />
  </button>`;
};

export const MineFlagTile = () => {
  return `<button class="tile open flag">
  <img class="icon" src="./public/icons/newspaper.svg" alt="icon" />
  </button>`;
};

export const MineExplodedTile = () => {
  return `<button class="tile open exploded">
  <img class="icon" src="./public/icons/star.svg" alt="icon" />
  </button>`;
};

export const EmptyTile = () => {
  return `<button class="tile empty">
  </button>`;
};
