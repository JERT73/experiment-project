console.log("Tic-Tac-Toe");
let body = document.querySelector("body");

let buttons = document.querySelectorAll(".game-board-button");
buttons.forEach((boardButton, index) => {
  boardButton.addEventListener("click", () => {
    boardMove(index);
  });
});

let continueButton = document.querySelector(".js-continue-button");
continueButton.addEventListener("click", () => {
  continueGame();
});

let resetButton = document.querySelector(".js-reset-button");
resetButton.addEventListener("click", () => {
  resetGame();
});

let boardStatus = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let scoreObject = JSON.parse(localStorage.getItem("score")) || {
  player1Won: 0,
  player2Won: 0,
  draw: 0,
};
updateScoreBoard();
let xmoved = false;

function boardMove(index) {
  if (!boardStatus[index]) {
    if (!xmoved) {
      buttons[index].innerHTML = "X";
      buttons[index].classList.add("x-button");
      boardStatus[index] = "X";
      xmoved = true;
    } else {
      buttons[index].innerHTML = "O";
      buttons[index].classList.add("o-button");
      boardStatus[index] = "O";
      xmoved = false;
    }
    let gameResult = gameStatus();
    if (gameResult) {
      if (gameResult.result === "won") {
        resultWin(gameResult);
      } else {
        resultDraw();
      }
      updateScoreBoard();
    }
  }
}

function gameStatus() {
  for (let i = 0; i < 9; i += 3) {
    if (
      boardStatus[i] === boardStatus[i + 1] &&
      boardStatus[i + 1] === boardStatus[i + 2] &&
      boardStatus[i + 2] != 0
    ) {
      return {
        result: "won",
        winMove: [i, i + 1, i + 2],
        winner: boardStatus[i],
      };
    }
  }
  for (let i = 0; i < 3; i++) {
    if (
      boardStatus[i] === boardStatus[i + 3] &&
      boardStatus[i + 3] === boardStatus[i + 6] &&
      boardStatus[i + 6] != 0
    ) {
      return {
        result: "won",
        winMove: [i, i + 3, i + 6],
        winner: boardStatus[i],
      };
    }
  }
  for (let i = 0; i < 3; i += 2) {
    if (
      boardStatus[i] === boardStatus[4] &&
      boardStatus[4] === boardStatus[4 + (4 - i)] &&
      boardStatus[4] != 0
    ) {
      return {
        result: "won",
        winMove: [i, 4, 4 + (4 - i)],
        winner: boardStatus[i],
      };
    }
  }
  for (let i = 0; i < 9; i++) {
    if (!boardStatus[i]) {
      return 0;
    }
  }
  return {
    result: "draw",
  };
}

function resultWin(resultObject) {
  document.querySelector(
    ".js-result-para"
  ).innerHTML = `${resultObject.winner} Won!`;
  for (let i = 0; i < 9; i++) {
    if (!boardStatus[i]) {
      boardStatus[i] = " ";
    }
  }
  if (resultObject.winner === "X") {
    for (let i = 0; i < 3; i++) {
      buttons[resultObject.winMove[i]].classList.add("x-won-button");
    }
    scoreObject.player1Won++;
  } else {
    for (let i = 0; i < 3; i++) {
      buttons[resultObject.winMove[i]].classList.add("o-won-button");
    }
    scoreObject.player2Won++;
  }
}

function resultDraw() {
  scoreObject.draw++;
  for (let i = 0; i < 9; i++) {
    buttons[i].classList.add("draw-button");
  }
  document.querySelector(".js-result-para").innerHTML = `It's a Draw!`;
}

function continueGame() {
  boardStatus = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  xmoved = false;
  buttons.forEach((button) => {
    button.innerHTML = "";
    button.classList.remove("draw-button");
    button.classList.remove("x-won-button");
    button.classList.remove("o-won-button");
    button.classList.remove("x-button");
    button.classList.remove("o-button");
  });
}

function resetGame() {
  document.querySelector(".js-result-para").innerHTML = ` `;
  continueGame();
  scoreObject.player1Won = 0;
  scoreObject.player2Won = 0;
  scoreObject.draw = 0;
  updateScoreBoard();
  localStorage.removeItem("score");
}

function updateScoreBoard() {
  let player1Score = document.querySelector(".js-player1");
  let player2Score = document.querySelector(".js-player2");
  let drawScore = document.querySelector(".js-draw");
  player1Score.innerHTML = scoreObject.player1Won;
  player2Score.innerHTML = scoreObject.player2Won;
  drawScore.innerHTML = scoreObject.draw;
  localStorage.setItem("score", JSON.stringify(scoreObject));
}
