// Index.js
import "./Styles.css";
import { GameController } from "./GameController";

class BuildBoardDom {
  constructor() {
    this.Aiside = document.querySelector(".AIBoard");
    this.Playerside = document.querySelector(".PlayerBoard");
    this.GameController = new GameController();
    this.GameController.startGame();

    this.DomShip_Player = [];
  }

  BuildBoardwithdiv(container) {
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
    const boardData = this.GameController.RealPlayer.PlayerBoard.ship;
    this.Playerside.querySelectorAll(".Board-Cell-Style").forEach(c => c.style.backgroundColor = "");

    boardData.forEach(shipObj => {
      shipObj.position.forEach(pos => {
        const cell = this.Playerside.querySelector(
          `.Board-Cell-Style[data-row="${pos[0]}"][data-col="${pos[1]}"]`
        );
        if (cell) cell.style.backgroundColor = "rgb(45, 45, 45)";
      });
    });
  }

  RandomizePlayerBoard() {
    this.GameController.ResetPlayerside();
    this.GameController.PlayerRandomPlacement();
    this.RenderPlayerShips();
  }
}

class DomManipulation {
  constructor() {
    this.gameUI = new BuildBoardDom();
  }

  init() {
    this.gameUI.BuildBoardwithdiv(this.gameUI.Playerside);
    this.gameUI.BuildBoardwithdiv(this.gameUI.Aiside);
    this.gameUI.RandomizePlayerBoard();

    document.querySelector(".Randomize")?.addEventListener("click", () => {
      this.gameUI.RandomizePlayerBoard();
    });

    // Main Click Listener for Attacks
    this.gameUI.Aiside.addEventListener("click", (e) => {
      if (e.target.classList.contains("Board-Cell-Style")) {
        this.handlePlayerAttack(e.target);
      }
    });
  }

  handlePlayerAttack(cell) {
    const ctrl = this.gameUI.GameController;


    if (ctrl.CurrentTurn !== "Player" || cell.classList.contains("hit") || cell.classList.contains("miss")) return;

    const row = cell.dataset.row;
    const col = cell.dataset.col;
    const result = ctrl.AttackDaBoard(row, col, "Ai");

    if (result === "Hit!") {
      cell.style.backgroundColor = "red";
      cell.classList.add("hit");
    } else {
      cell.style.backgroundColor = "#eee";
      cell.classList.add("miss");
    }


    setTimeout(() => this.handleAiAttack(), 600);
  }

  handleAiAttack() {
    const ctrl = this.gameUI.GameController;
    let row, col, cell, alreadyHit;

    do {
      row = Math.floor(Math.random() * 10);
      col = Math.floor(Math.random() * 10);
      cell = this.gameUI.Playerside.querySelector(`.Board-Cell-Style[data-row="${row}"][data-col="${col}"]`);
      alreadyHit = cell.classList.contains("hit") || cell.classList.contains("miss");
    } while (alreadyHit);

    const result = ctrl.AttackDaBoard(row, col, "Player");

    if (result === "Hit!") {
      cell.style.backgroundColor = "red";
      cell.classList.add("hit");
    } else {
      cell.style.backgroundColor = "lightblue";
      cell.classList.add("miss");
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const dom = new DomManipulation();
  dom.init();
});