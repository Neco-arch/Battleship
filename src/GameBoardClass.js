import { Createship } from "./ShipClass";

export class GameBoard {
  constructor() {
    this.Record = new Array(5).fill(0);
    this.PlayerBoard = [];
    this.ship = [];
    this.MissedShot = [];
    this.shipCounter = 0;
  }

  BuildBoard() {
    this.PlayerBoard = [];
    for (let i = 0; i < 10; i++) {
      let lengthArray = new Array(10).fill(0);
      this.PlayerBoard.push(lengthArray);
    }
    return this.PlayerBoard;
  }

  CheckPosition(X_axis, Y_axis, length) {
    if (X_axis > 9 || X_axis < 0 || Y_axis > 9 || Y_axis < 0) {
      return false;
    }

    if (X_axis + length - 1 > 9) {
      return false;
    }

    for (let i = X_axis; i < X_axis + length; i++) {
      if (this.PlayerBoard[Y_axis][i] === 1) {
        return false;
      }
    }

    return true;
  }

  PlaceShip(X_axis, Y_axis, length, Rotate = false) {
    const OldX_axis = X_axis;
    const OldY_axis = Y_axis;
    if (this.CheckPosition(X_axis, Y_axis, length)) {
      const CreateShip = new Createship(length);
      this.shipCounter++;
      if (Rotate === true) {
        for (let i = OldY_axis; i < OldY_axis + length; i++) {
          this.PlayerBoard[i][X_axis] = 1;
          CreateShip.position.push([X_axis, i]);
        }
      } else {
        for (let i = OldX_axis; i < OldX_axis + length; i++) {
          this.PlayerBoard[Y_axis][i] = 1;
          CreateShip.position.push([i, Y_axis]);
        }
      }
      this.ship.push(CreateShip);
      return this.PlayerBoard;
    } else {
      return "X_axis or Y_axis is wrong or Position is already taken!";
    }
  }

  receiveAttack(X_axis, Y_axis) {
    const ShipNode = this.FindShipName(X_axis, Y_axis);
    if (ShipNode === "Ship not found") {
      return;
    }
    this.PlayerBoard[Y_axis][X_axis] = "X";
    ShipNode.hit();
    if (ShipNode.length === ShipNode.HitsCounter) {
      ShipNode.Check_Sunk();
      for (let i = 0; i < this.ship.length; i++) {
        if (this.ship[i].isSunk === true) {
          this.ship.splice(i, 1);
        }
      }
    }
    return ShipNode;
  }

  FindShipName(X_axis, Y_axis) {
    if (this.PlayerBoard[Y_axis][X_axis] === 1) {
      for (let ship of this.ship) {
        for (let pos of ship.position) {
          if (pos[0] === X_axis && pos[1] === Y_axis) {
            return ship;
          }
        }
      }
    } else {
      this.PlayerBoard[Y_axis][X_axis] = "O";
      this.MissedShot.push([X_axis, Y_axis]);
      return "Ship not found";
    }
  }

  CheckTheGameend() {
    if (this.ship.length < 0) {
      return false;
    }
    return true;
  }
}
