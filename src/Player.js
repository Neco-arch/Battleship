import { GameBoard } from "./GameBoardClass";

export class player {
    constructor() {
        Win = 0;
        Lose = 0;
    }
    CreatePlayerBoard() {
        const PlayerBoard = new GameBoard();
        return PlayerBoard;
    }
}
