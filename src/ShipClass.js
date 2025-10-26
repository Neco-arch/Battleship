export class Createship {
    constructor(length, HitsCounter = 0, isSunk = false) {
        this.length = length;
        this.HitsCounter = HitsCounter;
        this.isSunk = isSunk;
    }

    hit() {
        this.HitsCounter += 1;
        return
    }

    isSunk() {
        if (this.HitsCounter >= this.length) {
            this.isSunk = true
        }
        return
    }
}
