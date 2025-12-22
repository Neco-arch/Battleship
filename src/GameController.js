
import { player } from "./Player";

export class GameController {
    constructor() {
        this.is_game_over = false;
        this.CurrentTurn = "Player";
        this.RealPlayer = new player();
        this.AiPlayer = new player();
        this.PlaceShiplen = [4, 4, 2, 2, 1];
    }

    startGame() {
        this.CurrentTurn = "Player";
        this.is_game_over = false;
        this.AiPlayer.PlayerBoard.BuildBoard();
        this.RealPlayer.PlayerBoard.BuildBoard();
        this.AiPlayer.PlayerBoard.ship = [];
        this.RealPlayer.PlayerBoard.ship = [];
        this.AIPlacement();
    }

    // Helper to check if a ship can fit without touching others
    isAreaClear(board, row, col, length, isVertical) {
        for (let i = -1; i <= (isVertical ? length : 1); i++) {
            for (let j = -1; j <= (isVertical ? 1 : length); j++) {
                const checkRow = row + i;
                const checkCol = col + j;
                if (checkRow >= 0 && checkRow < 10 && checkCol >= 0 && checkCol < 10) {
                    if (board[checkRow][checkCol] === 1) return false;
                }
            }
        }
        return true;
    }

    placeAllShipsRandomly(participant) {
        const boardObj = participant.PlayerBoard;
        this.PlaceShiplen.forEach(length => {
            let placed = false;
            while (!placed) {
                const row = Math.floor(Math.random() * 10);
                const col = Math.floor(Math.random() * 10);
                const isVertical = Math.random() < 0.5;

                if (boardObj.CheckPosition(row, col, length, isVertical) &&
                    this.isAreaClear(boardObj.PlayerBoard, row, col, length, isVertical)) {
                    boardObj.PlaceShip(row, col, length, isVertical);
                    placed = true;
                }
            }
        });
    }

    AIPlacement() { this.placeAllShipsRandomly(this.AiPlayer); }
    PlayerRandomPlacement() { this.placeAllShipsRandomly(this.RealPlayer); }
    ResetPlayerside() {
        this.RealPlayer.PlayerBoard.ship = [];
        this.RealPlayer.PlayerBoard.BuildBoard();
    }

    AttackDaBoard(row, col, target) {
        const targetBoard = target === "Ai" ? this.AiPlayer.PlayerBoard : this.RealPlayer.PlayerBoard;
        const result = targetBoard.receiveAttack(row, col);
        
        // Switch turns
        this.CurrentTurn = (target === "Ai") ? "Ai" : "Player";
        return result; // Returns "Hit!" or "Miss" from your Gameboard class
    }
}