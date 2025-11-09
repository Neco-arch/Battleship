import { GameBoard } from "./GameBoardClass";

export class player {
    constructor() {
        this.Win = 0;
        this.Lose = 0;
        this.PlayerBoard = new GameBoard();
    }
}
