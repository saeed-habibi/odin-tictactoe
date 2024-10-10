const gameBoard = (function () {
  const board = ["E", "E", "E", "E", "E", "E", "E", "E", "E"];

  function setX(index) {
    if (index < 0 || index > 8) {
      console.error("Index out of range.");
      return;
    }
    board[index] = "X";
  }

  function setO(index) {
    if (index < 0 || index > 8) {
      console.error("Index out of range.");
      return;
    }
    board[index] = "O";
  }

  function printBoard() {
    console.log(board);
  }
  function reset() {
    board = [["E", "E", "E", "E", "E", "E", "E", "E", "E"]];
  }

  return { setX, setO, printBoard, reset };
})();

function makePlayer(name, char) {
  let isWinner = false;

  function win() {
    isWinner = true;
  }

  return { name, char, win };
}

const game = (function () {
  let isGameOver = false;

  function createPlayerX(name) {}
})();
