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
  return `<svg width="300" height="300" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><style>.spinner_SoJz{transform-origin:center;animation:spinner_YGAN 1.5s linear infinite}@keyframes spinner_YGAN{100%{transform:rotate(360deg)}}</style><path class="spinner_SoJz" d="M20.27,4.74a4.93,4.93,0,0,1,1.52,4.61,5.32,5.32,0,0,1-4.1,4.51,5.12,5.12,0,0,1-5.2-1.5,5.53,5.53,0,0,0,6.13-1.48A5.66,5.66,0,0,0,20.27,4.74ZM12.32,11.53a5.49,5.49,0,0,0-1.47-6.2A5.57,5.57,0,0,0,4.71,3.72,5.17,5.17,0,0,1,9.53,2.2,5.52,5.52,0,0,1,13.9,6.45,5.28,5.28,0,0,1,12.32,11.53ZM19.2,20.29a4.92,4.92,0,0,1-4.72,1.49,5.32,5.32,0,0,1-4.34-4.05A5.2,5.2,0,0,1,11.6,12.5a5.6,5.6,0,0,0,1.51,6.13A5.63,5.63,0,0,0,19.2,20.29ZM3.79,19.38A5.18,5.18,0,0,1,2.32,14a5.3,5.3,0,0,1,4.59-4,5,5,0,0,1,4.58,1.61,5.55,5.55,0,0,0-6.32,1.69A5.46,5.46,0,0,0,3.79,19.38ZM12.23,12a5.11,5.11,0,0,0,3.66-5,5.75,5.75,0,0,0-3.18-6,5,5,0,0,1,4.42,2.3,5.21,5.21,0,0,1,.24,5.92A5.4,5.4,0,0,1,12.23,12ZM11.76,12a5.18,5.18,0,0,0-3.68,5.09,5.58,5.58,0,0,0,3.19,5.79c-1,.35-2.9-.46-4-1.68A5.51,5.51,0,0,1,11.76,12ZM23,12.63a5.07,5.07,0,0,1-2.35,4.52,5.23,5.23,0,0,1-5.91.2,5.24,5.24,0,0,1-2.67-4.77,5.51,5.51,0,0,0,5.45,3.33A5.52,5.52,0,0,0,23,12.63ZM1,11.23a5,5,0,0,1,2.49-4.5,5.23,5.23,0,0,1,5.81-.06,5.3,5.3,0,0,1,2.61,4.74A5.56,5.56,0,0,0,6.56,8.06,5.71,5.71,0,0,0,1,11.23Z"/></svg>`;
};
