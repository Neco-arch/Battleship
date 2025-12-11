import "./Styles.css";
import { GameBoard } from "./GameBoardClass";

import { GameController } from "./GameController";

class BuildBoardDom {
    constructor() {
        this.Aiside = document.querySelector(".AIBoard");
        this.Playerside = document.querySelector(".PlayerBoard");
        this.GameController = new GameController();
        this.GameController.startGame();
    }

    BuildBoardwithdiv(classname) {
        if (classname) {
            let columns = 10;
            let rows = 10;

            for (let i = 0; i < rows; i++) {
                const div_row = document.createElement("div");
                div_row.className = "Board-Row-Style";

                for (let j = 0; j < columns; j++) {
                    const div_cell = document.createElement("div");
                    div_cell.className = "Board-Cell-Style";

                    div_cell.dataset.row = i;
                    div_cell.dataset.col = j;

                    div_row.appendChild(div_cell);
                }
                this.Aiside.appendChild(div_row);
            }
        } else {
            let columns = 10;
            let rows = 10;

            for (let i = 0; i < rows; i++) {
                const div_row = document.createElement("div");
                div_row.className = "Board-Row-Style";

                for (let j = 0; j < columns; j++) {
                    const div_cell = document.createElement("div");
                    div_cell.className = "Board-Cell-Style";

                    div_cell.dataset.row = i;
                    div_cell.dataset.col = j;

                    div_row.appendChild(div_cell);
                }
                this.Playerside.appendChild(div_row);
            }
        }
    }

    PlaceShipRandomlyonDOM() {
        this.GameController.PlayerRandomPlacement();
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                console.log(this.GameController.RealPlayer.PlayerBoard.PlayerBoard)
                if (this.GameController.RealPlayer.PlayerBoard.PlayerBoard[i][j] === 1) {
                    const cellchecker = `.Board-Cell-Style[data-row="${i}"][data-col="${j}"]`;
                    const Cell = document.querySelector(cellchecker);
                    Cell.style.backgroundColor = "white"
                    console.log("Hello")
                }
            }
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const BuildBoardFunction = new BuildBoardDom();
    BuildBoardFunction.BuildBoardwithdiv();
    BuildBoardFunction.BuildBoardwithdiv(true);
    document.querySelectorAll(".Board-Cell-Style").forEach((Elements) => {
        Elements.addEventListener("click", () => {
            console.log(Elements.dataset);
        });
    });
    BuildBoardFunction.PlaceShipRandomlyonDOM()

});
