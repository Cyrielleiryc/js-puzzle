/* eslint-disable consistent-return */

// Select all the tiles
const tiles = document.querySelectorAll('td');
// Select the div that appears when the player wins
const winner = document.querySelector('#winner');
// Select the "replay" button
const button = document.querySelector('button');

// Returns "true" if the tile can move
const canMove = (tile) => {
  const tileRowIndex = tile.parentElement.rowIndex;
  const tileCellIndex = tile.cellIndex;
  const emptyTile = document.querySelector(".empty");
  const emptyRowIndex = emptyTile.parentElement.rowIndex;
  if (tileRowIndex === emptyRowIndex) {
    if (tileCellIndex === emptyTile.cellIndex + 1 || tileCellIndex === emptyTile.cellIndex - 1) {
      return true;
    }
  } else if (tileCellIndex === emptyTile.cellIndex) {
    if (tileRowIndex === emptyRowIndex + 1 || tileRowIndex === emptyRowIndex - 1) {
      return true;
    }
  } else {
    return false;
  }
};

function moveTile(element) {
  // TOOD: Move the tile
  const emptyTile = document.querySelector(".empty");
  emptyTile.innerText = element.innerText;
  element.innerText = "";
  emptyTile.classList.remove("empty");
  element.classList.add("empty");
}

const winOrNo = () => {
  // TODO: Check if player has won
  let hasWon = "true";
  const tilesArr = Array.from(tiles);
  const tilesText = tilesArr.map(element => element.innerText);
  const tilesTextWithoutEmpty = tilesText.filter(element => element !== "");
  tilesTextWithoutEmpty.forEach((element) => {
    const numberInTile = Number.parseInt(element, 10);
    const numberIndex = tilesTextWithoutEmpty.indexOf(element);
    const nextNumber = Number.parseInt(tilesTextWithoutEmpty[numberIndex + 1], 10);
    if (numberInTile > nextNumber) {
      hasWon = "false";
    }
  });
  return hasWon === "true";
};

const checkIfPlayerWins = () => {
  if (winOrNo()) {
    winner.style.display = "block";
  }
};

// Add event listener on each tile
tiles.forEach((tile) => {
  tile.addEventListener('click', () => {
    if (canMove(tile)) {
      moveTile(tile);
      console.log(winOrNo());
      checkIfPlayerWins();
    }
  });
});

// Add event listener on "Rejouer" button
button.addEventListener('click', () => {
  location.reload();
  winner.style.display = "none";
});
