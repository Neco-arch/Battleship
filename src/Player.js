import { GameBoard } from "./GameBoardClass";

export class player {
    constructor(Name) {
        this.name = Name;
    }

    CreatePlayerBoard() {
        const PlayerBoard = new GameBoard(this.name);
        return PlayerBoard
    }
}
