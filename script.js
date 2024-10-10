// HTML Handles
const infoBarHandle = document.querySelector(".info-bar");
const gameBoardHandle = document.querySelector(".game-board");
const sideBarHandle = document.querySelector(".side-bar");
const playerXNameHandle = document.querySelector(".player-x-name");
const playerONameHandle = document.querySelector(".player-o-name");
const inputFormHandle = document.querySelector(".input-form");
const playerXNameInputHandle = document.querySelector("#player-x-name-input");
const playerONameInputHandle = document.querySelector("#player-o-name-input");

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
  let turn = "X";

  function switchTurn() {
    turn = turn === "X" ? "O" : "X";
  }

  function getTurn() {
    if (!turn) {
      return Error("It's no one's turn!");
    }
    return turn;
  }

  return { switchTurn, getTurn };
})();

const gameUI = (function () {
  // if the game is started, disable the inputs
  // otherwise disable the game board
  // state can be either 0 or 1
  function setGameState(state) {
    if (state === 0) {
      infoBarHandle.classList.add("disabled");
      gameBoardHandle.classList.add("disabled");
      sideBarHandle.classList.remove("disabled");
    } else if (state === 1) {
      infoBarHandle.classList.remove("disabled");
      gameBoardHandle.classList.remove("disabled");
      sideBarHandle.classList.add("disabled");
    }
  }

  function setPlayersDisplay(playerXName, playerOName) {
    playerXNameHandle.textContent = `X: ${playerXName}`;
    playerONameHandle.textContent = `O: ${playerOName}`;
  }

  return { setGameState, setPlayersDisplay };
})();

const game = (function () {
  function startGame(playerXName, playerOName) {
    players.createPlayerX(playerXName);
    players.createPlayerO(playerOName);

    gameUI.setPlayersDisplay(
      players.getPlayerX().name,
      players.getPlayerO().name
    );
    gameUI.setGameState(1);
  }

  function place(target) {
    if (target.classList.contains("cell")) {
      if (target.textContent === "X" || target.textContent === "O") return;

      const gameTurn = turn.getTurn();
      target.textContent = gameTurn;
      turn.switchTurn();
    }
  }

  function reset() {}

  return { startGame, place, reset };
})();

// Event Listeners
inputFormHandle.addEventListener("submit", (e) => {
  e.preventDefault();
  const playerXName = playerXNameInputHandle.value;
  const playerOName = playerONameInputHandle.value;

  if (playerXName && playerOName) {
    game.startGame(playerXName, playerOName);
  }
});

gameBoardHandle.addEventListener("click", (e) => {
  game.place(e.target);
});

// run at page load
gameUI.setGameState(0);
