const fields = document.querySelectorAll(".game-cell");
const resetButton = document.querySelector("#reset-game-btn");
const addNamesButton = document.querySelector("#add-names-btn");
const winner = document.querySelector("#winner");
const currPlayerField = document.querySelector("#current-player");
const winningPlayers = document.querySelectorAll(".player-wins");

let currentPlayer = "X";
let gameBoard = Array.from({ length: 9 }, () => "");
let playerXWins = 0;
let playerOWins = 0;
const players = [];

resetButton.addEventListener("click", () => {
  resetGame();
});

addNamesButton.addEventListener("click", () => {
  resetGame();
  if (
    document.querySelector("#playerName").value === "" ||
    document.querySelector("#playerName2").value === ""
  ) {
    alert("Please enter player names");
    return;
  }
  players[0] = document.querySelector("#playerName").value;
  players[1] = document.querySelector("#playerName2").value;
  currPlayerField.textContent = `Current Player: ${
    currentPlayer === "X" ? players[0] : players[1]
  }`;
  winningPlayers[0].textContent = `Player ${players[0]} Wins: ${playerXWins}`;
  winningPlayers[1].textContent = `Player ${players[1]} Wins: ${playerOWins}`;
});

fields.forEach((field, index) => {
  field.addEventListener("click", () => {
    if (gameBoard[index] === "" && !isGameOver() && !checkWinner()) {
      gameBoard[index] = currentPlayer;
      field.textContent = currentPlayer;
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      currPlayerField.textContent = `Current Player: ${
        currentPlayer === "X"
          ? players.length > 0
            ? players[0]
            : "X"
          : players.length > 1
          ? players[1]
          : "O"
      }`;

      const winningPlayer = checkWinner();
      if (winningPlayer) {
        storePlayerWins(winningPlayer);
        winner.textContent = `Player ${winningPlayer} wins!`;
      } else if (isGameOver()) {
        winner.textContent = "It's a draw!";
      }
    }
  });
});

function isGameOver() {
  if (gameBoard.includes("")) {
    return false;
  }

  return true;
}

function checkWinner() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (
      gameBoard[a] &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[a] === gameBoard[c]
    ) {
      return gameBoard[a];
    }
  }

  return null;
}

function resetGame() {
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  fields.forEach((field) => {
    field.textContent = "";
  });
  winner.textContent = "";
  currentPlayer = "X";
  currPlayerField.textContent = `Current Player: ${currentPlayer}`;
  playerXWins = 0;
  playerOWins = 0;
}

function storePlayerWins(user) {
  if (user === "X") {
    playerXWins++;
    winningPlayers[0].textContent = `Player ${
      players.length > 0 ? players[0] : "X"
    } Wins: ${playerXWins}`;
  } else if (user === "O") {
    playerOWins++;
    winningPlayers[1].textContent = `Player ${
      players.length > 0 ? players[1] : "O"
    } Wins: ${playerOWins}`;
  }
}
