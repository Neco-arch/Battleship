import "./Styles.css";

class BuildBoardDom {
    constructor() {
        this.Aiside = document.querySelector(".AIBoard");
        this.Playerside = document.querySelector(".PlayerBoard");
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
}

class PlaceShiprandomly {

    PlaceShip() {
        const Row = Math.floor(Math.random() * (9 - 0 + 1)) + min;
        const column = Math.floor(Math.random() * (9 - 0 + 1)) + min;
        
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const BuildBoardFunction = new BuildBoardDom();
    BuildBoardFunction.BuildBoardwithdiv();
    BuildBoardFunction.BuildBoardwithdiv(true);
    document.querySelectorAll(".Board-Cell-Style").forEach((Elements) => {
        Elements.addEventListener("click", () => {
            console.log(Elements.dataset)
        })
    })
});


