export class Createship {
    constructor(Name, length, HitsCounter = 0, isSunk = false) {
        this.Name = Name
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
