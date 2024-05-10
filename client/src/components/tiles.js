export const ClosedTile = (row, col) => {
  return `<button onclick="handleTileClick(${row},${col})" class="tile closed"></button>`;
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
  <img class="icon" src="./public/icons/flower.svg" alt="icon" />
  </button>`;
};

export const MineExplodedTile = () => {
  return `<button class="tile open exploded">
  <img class="icon" src="./public/icons/splat.svg" alt="icon" />
  </button>`;
};

export const EmptyTile = () => {
  return `<button class="tile empty">
  </button>`;
};

export const Loader = () => {
  return `
  <section class="cover center"><section class="column">
  <span class="loader"></span>
  </section>
  `;
};
