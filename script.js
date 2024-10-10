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
  return { name, char };
}

const players = (function () {
  let playerX;
  let playerO;

  function createPlayerX(name) {
    playerX = makePlayer(name, "X");
  }

  function createPlayerO(name) {
    playerO = makePlayer(name, "O");
  }

  function getPlayerX() {
    if (!playerX) return Error("Player X hasn't been created yet");
    return playerX;
  }

  function getPlayerO() {
    if (!playerO) return Error("Player O hasn't been created yet");
    return playerO;
  }

  return { createPlayerX, createPlayerO, getPlayerX, getPlayerO };
})();

const turn = (function () {
  let turn;

  function setTurn(char) {
    if (char !== "X" && char !== "O") {
      return Error("Wrong char, please enter X or O");
    }
    turn = char;
  }

  function getTurn() {
    if (!turn) {
      return Error("It's no one's turn!");
    }
    return turn;
  }

  return { setTurn, getTurn };
})();

const game = (function () {})();
