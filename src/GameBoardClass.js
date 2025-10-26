import { Createship } from "./ShipClass";

export class GameBoard {

    constructor() {
        this.Record = new Array(5).fill(0, 0, 4)
        this.PlayerBoard = []
    }

    BuildBoard() {
        this.PlayerBoard = [];
        for (let i = 0; i < 10; i++) {
            let lengthArray = new Array(10).fill(0, 0, 10);
            this.PlayerBoard.push(lengthArray);
        }
        return this.PlayerBoard;
    }

    PlaceShip(X_axis, Y_axis, length) {
        if (length < 0 || length > 4) {
            return "Length is incorrect"
        }
        if (X_axis - 1 > 10 || Y_axis - 1 > 10 || X_axis - 1 < 0 || Y_axis - 1 < 0) {
            return "X_axis or Y_axis are wrong"
        }
        if (X_axis + length - 1 > 10 || Y_axis + length - 1 > 10) {
            return
        }
        this.Record.push(X_axis, Y_axis)
        const BuildNewShip = new Createship(length);
        for (let i = X_axis; i < X_axis + length; i++) {
            this.PlayerBoard[Y_axis - 1][i - 1] = 1
        }
        return this.PlayerBoard
    }

    reset() {
        this.BuildBoard()
    }
}


