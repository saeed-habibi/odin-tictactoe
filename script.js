// HTML Handles
const infoBarHandle = document.querySelector(".info-bar");
const gameBoardHandle = document.querySelector(".game-board");
const sideBarHandle = document.querySelector(".side-bar");
const playerXNameHandle = document.querySelector(".player-x-name");
const playerONameHandle = document.querySelector(".player-o-name");
const inputFormHandle = document.querySelector(".input-form");
const playerXNameInputHandle = document.querySelector("#player-x-name-input");
const playerONameInputHandle = document.querySelector("#player-o-name-input");
const resetButtonHandle = document.querySelector(".reset-button");

const gameBoard = (function () {
  let board = ["", "", "", "", "", "", "", "", ""];

  function setCell(index, char) {
    board[index] = char;
  }

  function getBoard() {
    return board;
  }

  function checkWin() {
    const matches = [
      [board[0], board[1], board[2]],
      [board[3], board[4], board[5]],
      [board[6], board[7], board[8]],
      [board[0], board[3], board[6]],
      [board[1], board[4], board[7]],
      [board[2], board[5], board[8]],
      [board[0], board[4], board[8]],
      [board[2], board[4], board[6]],
    ];

    matches.forEach((match) => {
      if (match[0] === "X" && match[1] === "X" && match[2] === "X") {
        players.setWinner(players.getPlayer("X"));
      } else if (match[0] === "O" && match[1] === "O" && match[2] === "O") {
        players.setWinner(players.getPlayer("O"));
      }
    });
  }

  function checkDraw() {
    for (let cell of board) {
      if (cell === "") {
        return;
      }
    }
    displayController.setDraw();
  }

  function reset() {
    board = ["", "", "", "", "", "", "", "", ""];
  }

  return { setCell, getBoard, checkWin, checkDraw, reset };
})();

function makePlayer(name, char) {
  return { name, char };
}

const players = (function () {
  let playerX;
  let playerO;
  let activePlayer;
  let winner;

  function createPlayer(char, name) {
    if (char === "X") playerX = makePlayer(name, "X");
    if (char === "O") playerO = makePlayer(name, "O");
  }

  function getPlayer(char) {
    if (char === "X") return playerX;
    if (char === "O") return playerO;
  }

  function getActivePlayer() {
    return activePlayer;
  }

  function toggleActivePlayer() {
    if (activePlayer === playerX) {
      activePlayer = playerO;
    } else {
      activePlayer = playerX;
    }
  }

  function setWinner(player) {
    winner = player;
  }

  function getWinner() {
    return winner;
  }

  function reset() {
    playerX = null;
    playerO = null;
    activePlayer = null;
    winner = null;
  }

  return {
    createPlayer,
    getPlayer,
    getActivePlayer,
    toggleActivePlayer,
    setWinner,
    getWinner,
    reset,
  };
})();

const displayController = (function () {
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

  function toggleActivePlayer() {
    const activePlayer = players.getActivePlayer();
    if (activePlayer === players.getPlayer("X")) {
      playerONameHandle.classList.remove("active");
      playerXNameHandle.classList.add("active");
    } else if (activePlayer === players.getPlayer("O")) {
      playerXNameHandle.classList.remove("active");
      playerONameHandle.classList.add("active");
    }
  }

  function updateBoard() {
    for (let i = 0; i < 9; i++) {
      gameBoardHandle.children[i].textContent = gameBoard.getBoard()[i];
    }
  }

  function clearInputs() {
    playerXNameInputHandle.value = "";
    playerONameInputHandle.value = "";
  }

  function setWinner(player) {
    playerXNameHandle.classList.remove("active");
    playerONameHandle.classList.remove("active");
    gameBoardHandle.classList.add("disabled");
    if (player.char === "X") {
      playerXNameHandle.classList.add("winner");
      playerONameHandle.classList.add("loser");
    } else if (player.char === "O") {
      playerONameHandle.classList.add("winner");
      playerXNameHandle.classList.add("loser");
    }
  }

  function setDraw() {
    playerXNameHandle.classList.add("active");
    playerONameHandle.classList.add("active");
    gameBoardHandle.classList.add("disabled");
  }

  function reset() {
    playerXNameHandle.textContent = "";
    playerONameHandle.textContent = "";

    for (let i = 0; i < 9; i++) {
      gameBoardHandle.children[i].textContent = "";
    }

    playerXNameHandle.classList.remove("active");
    playerXNameHandle.classList.remove("winner");
    playerXNameHandle.classList.remove("loser");
    playerONameHandle.classList.remove("active");
    playerONameHandle.classList.remove("winner");
    playerONameHandle.classList.remove("loser");
    setGameState(0);
  }

  return {
    setGameState,
    setPlayersDisplay,
    toggleActivePlayer,
    updateBoard,
    clearInputs,
    setWinner,
    setDraw,
    reset,
  };
})();

const game = (function () {
  function startGame(playerXName, playerOName) {
    players.createPlayer("X", playerXName);
    players.createPlayer("O", playerOName);

    displayController.setPlayersDisplay(
      players.getPlayer("X").name,
      players.getPlayer("O").name
    );
    displayController.setGameState(1);
    players.toggleActivePlayer();
    displayController.toggleActivePlayer();
    displayController.clearInputs();
  }

  function place(target) {
    if (!target.classList.contains("cell")) return;
    if (target.textContent === "X" || target.textContent === "O") return;

    const cellIndex = Number(target.classList[1].match(/cell-(\d)/)[1]);
    const activePlayerChar = players.getActivePlayer().char;

    gameBoard.setCell(cellIndex, activePlayerChar);
    displayController.updateBoard();
    players.toggleActivePlayer();
    displayController.toggleActivePlayer();

    gameBoard.checkWin();
    if (players.getWinner()) {
      displayController.setWinner(players.getWinner());
    }

    gameBoard.checkDraw();
  }

  function reset() {
    gameBoard.reset();
    players.reset();
    displayController.reset();
  }

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

resetButtonHandle.addEventListener("click", game.reset);

// run at page load
displayController.setGameState(0);
