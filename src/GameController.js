import { player } from "./Player";

export class GameController {
    constructor() {
        this.is_game_over = false;
        this.CurrentTurn = null;
        this.RealPlayer = new player();
        this.AiPlayer = new player();
        this.PlaceShiplen = [4, 4, 2, 2, 1];
    }

    startGame() {
        this.CurrentTurn = "Player";
        this.is_game_over = false;

        // Reset Boards
        this.AiPlayer.PlayerBoard.BuildBoard();
        this.RealPlayer.PlayerBoard.BuildBoard();
        this.AiPlayer.PlayerBoard.ship = [];
        this.RealPlayer.PlayerBoard.ship = [];

        this.AIPlacement();
    }

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

    AIPlacement() {
        this.placeAllShipsRandomly(this.AiPlayer);
    }

    PlayerRandomPlacement() {
        this.placeAllShipsRandomly(this.RealPlayer);
    }


    placeAllShipsRandomly(participant) {
        const boardObj = participant.PlayerBoard;

        for (let i = 0; i < this.PlaceShiplen.length; i++) {
            const length = this.PlaceShiplen[i];
            let placed = false;

            while (!placed) {
                const RondomnumberAlgo = () => {
                    const R = new Uint8Array(1);
                    window.crypto.getRandomValues(R)
                    return R[0] % 10

                }
                const row = RondomnumberAlgo();
                const col = RondomnumberAlgo();
                const isVertical = Math.random() < 0.5;

                if (boardObj.CheckPosition(row, col, length, isVertical) &&
                    this.isAreaClear(boardObj.PlayerBoard, row, col, length, isVertical)) {

                    boardObj.PlaceShip(row, col, length, isVertical);
                    placed = true;
                }
            }
        }
    }

    ResetPlayerside() {
        this.RealPlayer.PlayerBoard.ship = []
        this.RealPlayer.PlayerBoard.BuildBoard();
    }

    AttackDaBoard(X_axis, Y_axis, PlayerGotAttacked) {
        if (PlayerGotAttacked === "Player") {
            const Attack = this.RealPlayer.PlayerBoard.receiveAttack(X_axis, Y_axis);
            this.CurrentTurn = "Player"
            return
        }

        if (PlayerGotAttacked === "Ai") {
            const Attack = this.AiPlayer.PlayerBoard.receiveAttack(X_axis, Y_axis)
            this.CurrentTurn = "Ai"
            return
        }
    }
}