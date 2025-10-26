import { Createship } from "./ShipClass";

export class GameBoard {

    constructor() {
        this.Record = new Array(5).fill(0, 0, 4)
        this.PlayerBoard = []
        this.ship = []
        this.MissedShot = []
    }

    BuildBoard() {
        this.PlayerBoard = [];
        for (let i = 0; i < 10; i++) {
            let lengthArray = new Array(10).fill(0, 0, 10);
            this.PlayerBoard.push(lengthArray);
        }
        return this.PlayerBoard;
    }

    CheckPosition(X_axis, Y_axis, length) {
        if (X_axis > 10 || X_axis < 0 || Y_axis > 10 || Y_axis < 0) {
            return false
        }

        if (X_axis + length - 1 > 9 || Y_axis + length - 1 > 9) {
            return false
        }

        for (let i = X_axis; i > X_axis; i++) {
            if (this.PlayerBoard[Y_axis][i] === 1) {
                return false
            }
        }

        return true
    }

    PlaceShip(X_axis, Y_axis, length) {
        if (this.CheckPosition(X_axis, Y_axis, length)) {
            const BuildNewShip = new Createship(length);

            for (let i = X_axis; i < X_axis + length; i++) {
                this.PlayerBoard[Y_axis][i] = 1
            }
            return this.PlayerBoard
        } else {
            return "X_axis or Y_axis is wrong !"
        }
    }

    receiveAttack(X_axis, Y_axis) {
        if (this.PlayerBoard[Y_axis][X_axis] === 1) {
            
        } else {
            this.MissedShot.push([X_axis, Y_axis])
        }
    }

    reset() {
        this.PlayerBoard = []
        return this.BuildBoard()
    }
}


