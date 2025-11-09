import { Createship } from "./ShipClass";

export class GameBoard {
  constructor() {
    this.Record = new Array(5).fill(0);
    this.PlayerBoard = [];
    this.ship = [];
    this.MissedShot = [];
    this.shipCounter = 0;
  }

  // Build Board from array
  BuildBoard() {
    this.PlayerBoard = [];
    for (let i = 0; i < 10; i++) {
      this.PlayerBoard.push(new Array(10).fill(0));
    }
    return this.PlayerBoard;
  }

  // Check if the position is valid and not taken
  CheckPosition(X_axis, Y_axis, length, Verti = false) {
    if (X_axis < 0 || X_axis > 9 || Y_axis < 0 || Y_axis > 9) return false;

    if (Verti) {
      if (Y_axis + length - 1 > 9) return false;
      for (let i = Y_axis; i < Y_axis + length; i++) {
        if (this.PlayerBoard[i][X_axis] !== 0) return false;
      }
    } else {
      if (X_axis + length - 1 > 9) return false;
      for (let i = X_axis; i < X_axis + length; i++) {
        if (this.PlayerBoard[Y_axis][i] !== 0) return false;
      }
    }
    return true;
  }

  // Place ship on the board
  PlaceShip(X_axis, Y_axis, length, Verti = false) {
    if (this.PlayerBoard.length === 0) this.BuildBoard(); // auto build if not built

    if (!this.CheckPosition(X_axis, Y_axis, length, Verti)) {
      return "X_axis or Y_axis is wrong or Position is already taken!";
    }

    const CreateShip = new Createship(length);
    this.shipCounter++;

    if (Verti) {
      for (let i = Y_axis; i < Y_axis + length; i++) {
        this.PlayerBoard[i][X_axis] = 1;
        CreateShip.position.push([X_axis, i]);
      }
    } else {
      for (let i = X_axis; i < X_axis + length; i++) {
        this.PlayerBoard[Y_axis][i] = 1;
        CreateShip.position.push([i, Y_axis]);
      }
    }

    this.ship.push(CreateShip);
    return this.PlayerBoard;
  }

  // Receive an attack at a given position
  receiveAttack(X_axis, Y_axis) {
    if (X_axis < 0 || X_axis > 9 || Y_axis < 0 || Y_axis > 9)
      return "Invalid coordinates!";

    const currentCell = this.PlayerBoard[Y_axis][X_axis];
    if (currentCell === "X" || currentCell === "O") return "Already attacked!";

    const ShipNode = this.FindShipName(X_axis, Y_axis);

    if (ShipNode === "Ship not found") {
      this.PlayerBoard[Y_axis][X_axis] = "O";
      this.MissedShot.push([X_axis, Y_axis]);
      return "Missed!";
    }

    // Register a hit
    this.PlayerBoard[Y_axis][X_axis] = "X";
    ShipNode.hit();

    if (ShipNode.length === ShipNode.HitsCounter) {
      ShipNode.Check_Sunk();
      this.ship = this.ship.filter((s) => !s.isSunk);
    }

    return "Hit!";
  }

  // Find the ship occupying given coordinates
  FindShipName(X_axis, Y_axis) {
    if (this.PlayerBoard[Y_axis][X_axis] === 1) {
      for (let ship of this.ship) {
        for (let pos of ship.position) {
          if (pos[0] === X_axis && pos[1] === Y_axis) {
            return ship;
          }
        }
      }
    }
    return "Ship not found";
  }

  // Check if all ships are sunk
  CheckTheGameend() {
    return this.ship.length === 0; // true means game over
  }
}
