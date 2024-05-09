import {
  ClosedTile,
  NumberTile,
  FlagTile,
  EmptyTile,
  MineExplodedTile,
  MineFlagTile,
  MineTile,
} from "./tiles.js";

const Grid = ({ grid }) => {
  const gridHTML = grid.map((row) => {
    const rowHTML = row.map((tile) => {
      if (tile.isOpen) {
        if (tile.isMine) {
          if (tile.isFlagged) {
            return tile.isExploded ? MineExplodedTile() : MineFlagTile();
          }
          return MineTile();
        }
        if (tile.isFlagged) {
          return FlagTile();
        }
        if (tile.value === 0) {
          return EmptyTile();
        }
        return NumberTile({ value: tile.value });
      }
      return ClosedTile();
    });
    return `<section class="row">${rowHTML.join("")}</section>`;
  });
  return `<section id="GameBoard" class="background">${gridHTML.join(
    ""
  )}</section>`;
};

export default Grid;
