import { ClosedTile, NumberTile, FlagTile, EmptyTile } from "./tiles.js";

const Grid = ({ grid }) => {
  const gridHTML = grid.map((row) => {
    const rowHTML = row.map((tile) => {
      if (tile.isOpen) {
        if (tile.isMine) {
          if (tile.isFlagged) {
            return FlagTile();
          }
          return EmptyTile();
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
    return `<section>${rowHTML.join("")}</section>`;
  });
  return `<section id="GameBoard" class="background">${gridHTML.join(
    ""
  )}</section>`;
};

export default Grid;
