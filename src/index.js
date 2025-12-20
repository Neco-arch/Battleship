import "./Styles.css";
import { GameController } from "./GameController";

class BuildBoardDom {
  constructor() {
    this.Aiside = document.querySelector(".AIBoard");
    this.Playerside = document.querySelector(".PlayerBoard");
    this.GameController = new GameController();
    this.GameController.startGame();
    this.CurrentTurn = this.GameController.CurrentTurn;
    this.PlayerSidedom = document.querySelector(".Player_side");
    this.AiSideDom = document.querySelector(".Ai_Side");
  }

  BuildBoardwithdiv(container, Side) {
    if (!container) return;
    container.innerHTML = "";
    for (let i = 0; i < 10; i++) {
      const div_row = document.createElement("div");
      div_row.className = "Board-Row-Style";

      for (let j = 0; j < 10; j++) {
        const div_cell = document.createElement("div");
        div_cell.className = "Board-Cell-Style";
        div_cell.dataset.row = i;
        div_cell.dataset.col = j;
        div_row.appendChild(div_cell);
      }

      container.appendChild(div_row);
    }
  }

  RenderPlayerShips() {
    if (!this.Playerside) return;

    const boardData = this.GameController.RealPlayer.PlayerBoard.ship;

    for (let i = 0; i < boardData.length; i++) {
      const PositionArray = boardData[i].position;
      for (let j = 0; j < PositionArray.length; j++) {
        const currentPos = PositionArray[j];
        const cell = this.Playerside.querySelector(
          `.Board-Cell-Style[data-row="${currentPos[0]}"][data-col="${currentPos[1]}"]`
        );
        cell.style.backgroundColor = "rgb(45, 45, 45)";
      }
    }
  }

  // Test Only purpose
  RenderAiSide() {
    const boardData = this.GameController.AiPlayer.PlayerBoard.ship;

    console.log(boardData);

    for (let i = 0; i < boardData.length; i++) {
      const PositionArray = boardData[i].position;
      for (let j = 0; j < PositionArray.length; j++) {
        const currentPos = PositionArray[j];
        const cell = this.Aiside.querySelector(
          `.Board-Cell-Style[data-row="${currentPos[0]}"][data-col="${currentPos[1]}"]`
        );
        cell.style.backgroundColor = "rgb(45, 45, 45)";
      }
    }
  }

  RandomizePlayerBoard() {
    this.GameController.ResetPlayerside();
    this.GameController.PlayerRandomPlacement();
    this.RenderPlayerShips();
    this.RenderAiSide();
  }
}

class DomMinipulation {
  constructor() {
    this.gameUI = new BuildBoardDom();
  }

  BuildBoard() {
    this.gameUI.BuildBoardwithdiv(this.gameUI.Playerside);
    this.gameUI.BuildBoardwithdiv(this.gameUI.Aiside);
    this.gameUI.RandomizePlayerBoard();

    const randomizeBtn = document.querySelector(".Randomize");

    if (randomizeBtn) {
      randomizeBtn.addEventListener("click", () => {
        const allCells = document.querySelectorAll(".Board-Cell-Style");
        allCells.forEach((cell) => {
          cell.style.backgroundColor = "";
        });
        this.gameUI.RandomizePlayerBoard();
      });
    }
  }

  Attacklogic(e) {
    const cell = e.target;
    const board = cell.closest(".PlayerBoard") || cell.closest(".AIBoard");
    console.log(board.className);
    if (board.className === "PlayerBoard" && this.gameUI.CurrentTurn == "Ai") {
      const Row = cell.dataset.row;
      const Column = cell.dataset.col;
    }
    if (board.className === "Ai_Side" && this.gameUI.CurrentTurn == "Player") {
      const Row = cell.dataset.row;
      const Column = cell.dataset.col;
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const DomMini = new DomMinipulation();
  DomMini.BuildBoard();
  document.addEventListener("click", (e) => {
    if (e.target.className === "Board-Cell-Style") {
      DomMini.Attacklogic(e);
    }
  });
});
