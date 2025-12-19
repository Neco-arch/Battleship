import "./Styles.css";
import { GameController } from "./GameController";

class BuildBoardDom {
    constructor() {
        this.Aiside = document.querySelector(".AIBoard");
        this.Playerside = document.querySelector(".PlayerBoard");
        this.GameController = new GameController();
        this.GameController.startGame();
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
        if (!this.Playerside) return;

        const boardData = this.GameController.RealPlayer.PlayerBoard.ship;

        console.log(boardData)

        for (let i = 0; i < boardData.length; i++) {
            const PositionArray = boardData[i].position
            for (let j = 0; j < PositionArray.length; j++) {
                const currentPos = PositionArray[j]
                const cell = this.Playerside.querySelector(`.Board-Cell-Style[data-row="${currentPos[0]}"][data-col="${currentPos[1]}"]`)
                console.log(cell)
                cell.style.backgroundColor = "white"
            }
        }
    }

    RandomizePlayerBoard() {
        this.GameController.ResetPlayerside();
        this.GameController.PlayerRandomPlacement();
        this.RenderPlayerShips();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const gameUI = new BuildBoardDom();

    gameUI.BuildBoardwithdiv(gameUI.Playerside);
    gameUI.BuildBoardwithdiv(gameUI.Aiside);
    gameUI.RandomizePlayerBoard();

    const randomizeBtn = document.querySelector(".Randomize");

    if (randomizeBtn) {
        randomizeBtn.addEventListener("click", () => {
            const allCells = document.querySelectorAll(".Board-Cell-Style");
            allCells.forEach((cell) => {
                cell.style.backgroundColor = "";
            });
            gameUI.RandomizePlayerBoard()
        });
    }
});
