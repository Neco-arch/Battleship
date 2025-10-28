import { Createship } from "./ShipClass";

export class GameBoard {
    constructor() {
        this.Record = new Array(5).fill(0, 0, 4);
        this.PlayerBoard = [];
        this.ship = [];
        this.MissedShot = [];
        this.shipCounter = 0;
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
            return false;
        }

        if (X_axis + length - 1 > 9 || Y_axis + length - 1 > 9) {
            return false;
        }

        for (let i = X_axis; i < X_axis + length; i++) {
            if (this.PlayerBoard[Y_axis][i] === 1) {
                return false;
            } else {
                continue;
            }
        }

        return true;
    }

    PlaceShip(X_axis, Y_axis, length) {
        const OldX_axis = X_axis;
        if (this.CheckPosition(X_axis, Y_axis, length)) {
            const CreateShip = new Createship(length);
            this.shipCounter++;
            for (let i = OldX_axis; i < OldX_axis + length; i++) {
                this.PlayerBoard[Y_axis][i] = 1;
                CreateShip.position.push([X_axis, Y_axis]);
                X_axis++;
            }
            this.ship.push(CreateShip);
            return this.PlayerBoard;
        } else {
            return "X_axis or Y_axis is wrong or Position is already taken!";
        }
    }

    receiveAttack(X_axis, Y_axis) {
        const ShipNode = this.FindShipName(X_axis, Y_axis);
    }

    FindShipName(X_axis, Y_axis) {
        let Findshipname = null;
        let parent = null;
        if (this.PlayerBoard[Y_axis][X_axis] === 1) {
            for (let [index, Elements] of this.ship.entries()) {
                if (Findshipname === null) {
                    let firstpath = this.ship[index].position;
                    parent = this.ship[index];
                    for (let i = 0; i < firstpath.length; i++) {
                        if (firstpath[i][0] === X_axis && firstpath[i][1] === Y_axis) {
                            return parent;
                        }
                    }
                } else {
                    break;
                }
            }
        } else {
            this.MissedShot.push(X_axis, Y_axis);
            return "No ship found";
        }
    }

    reset() {
        this.PlayerBoard = [];
        return this.BuildBoard();
    }

    test() {
        return this.ship;
    }
}
