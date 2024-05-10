import {
  ClosedTile,
  NumberTile,
  FlagTile,
  EmptyTile,
  MineExplodedTile,
  MineFlagTile,
  MineTile,
} from "./tiles.js";

const Grid = (grid) => {
  const gridHTML = grid.map((row, i) => {
    const rowHTML = row.map((tile, j) => {
      if (tile.revealed) {
        if (tile.isMine) {
          return MineTile();
        }
        if (tile.isFlagged) {
          return FlagTile();
        }
        if (tile.count === 0) {
          return EmptyTile();
        }
        return NumberTile({ value: tile.count });
      }
      return ClosedTile(i, j);
    });
    return `<section class="gridrow">${rowHTML.join("")}</section>`;
  });
  return `<section id="GameBoard" class="background gridcolumn">${gridHTML.join(
    ""
  )}</section>`;
};

export default Grid;
