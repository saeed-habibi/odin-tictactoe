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

  function reset() {
    board = ["", "", "", "", "", "", "", "", ""];
  }

  return { setCell, getBoard, reset };
})();

function makePlayer(name, char) {
  return { name, char };
}

const players = (function () {
  let playerX;
  let playerO;
  let activePlayer;

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

  function reset() {
    playerX = null;
    playerO = null;
    activePlayer = null;
  }

  return {
    createPlayer,
    getPlayer,
    getActivePlayer,
    toggleActivePlayer,
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

  function reset() {
    playerXNameHandle.textContent = "";
    playerONameHandle.textContent = "";

    for (let i = 0; i < 9; i++) {
      gameBoardHandle.children[i].textContent = "";
    }

    playerXNameHandle.classList.remove("active");
    playerONameHandle.classList.remove("active");
    setGameState(0);
  }

  return {
    setGameState,
    setPlayersDisplay,
    toggleActivePlayer,
    updateBoard,
    clearInputs,
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
