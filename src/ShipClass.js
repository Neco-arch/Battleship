export class Createship {
    constructor(length, HitsCounter = 0, isSunk = false) {
        this.length = length;
        this.HitsCounter = HitsCounter;
        this.isSunk = isSunk;
        this.position = []
    }

    hit() {
        this.HitsCounter += 1;
        return
    }

    Check_Sunk() {
        this.isSunk = true
    }
}
