import { player } from "./Player";

export class GameController {
    constructor() {
        this.is_game_over = false;
        this.CurrentTurn = null;
        this.RealPlayer = new player();
        this.AiPlayer = new player();
        this.PlaceShiplen = [4, 3, 3, 2, 1];
        this.AiPlayer.PlayerBoard.BuildBoard();
        this.RealPlayer.PlayerBoard.BuildBoard();
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

    AIPlacement() {
        for (let i = 0; i < this.PlaceShiplen.length; i++) {
            const length = this.PlaceShiplen[i];
            let placed = false;

            while (!placed) {
                const X_axis = Math.floor(Math.random() * 10);
                const Y_axis = Math.floor(Math.random() * 10);
                const Verti = Math.random() < 0.5;

                if (
                    this.AiPlayer.PlayerBoard.CheckPosition(X_axis, Y_axis, length, Verti)
                ) {
                    this.AiPlayer.PlayerBoard.PlaceShip(X_axis, Y_axis, length, Verti);
                    placed = true;
                }
            }
        }
    }

    PlayerRandomPlacement() {
        for (let i = 0; i < this.PlaceShiplen.length; i++) {
            const length = this.PlaceShiplen[i];
            let placed = false;

            while (!placed) {
                const X_axis = Math.floor(Math.random() * 10);
                const Y_axis = Math.floor(Math.random() * 10);
                const Verti = Math.random() < 0.5;

                if (
                    this.AiPlayer.PlayerBoard.CheckPosition(
                        X_axis,
                        Y_axis,
                        length,
                        Verti
                    )
                ) {
                    this.RealPlayer.PlayerBoard.PlaceShip(X_axis, Y_axis, length, Verti);
                    placed = true;
                }
            }
        }

    }

    AttackandChangeTurn(X_axis = 0, Y_axis = 0) {
        if (this.is_game_over) return "Game is already over!";

        if (this.CurrentTurn === "Player") {

            if (X_axis < 0 || X_axis > 9 || Y_axis < 0 || Y_axis > 9)
                return "Invalid coordinates!";
            this.AiPlayer.PlayerBoard.receiveAttack(X_axis, Y_axis);
            this.CheckTheGameIsEnded();
            this.CurrentTurn = "AI";
        } else {
            let validAttack = false;
            while (!validAttack) {
                const randX = Math.floor(Math.random() * 10);
                const randY = Math.floor(Math.random() * 10);
                const result = this.RealPlayer.PlayerBoard.receiveAttack(randX, randY);

                if (result !== "Already attacked!") {
                    validAttack = true;
                }
            }

            this.CheckTheGameIsEnded();
            this.CurrentTurn = "Player";
        }
    }

    CheckTheGameIsEnded() {
        if (this.RealPlayer.PlayerBoard.CheckTheGameend()) {
            this.AiPlayer.Win += 1;
            this.RealPlayer.Lose += 1;
            this.is_game_over = true;
            return "AI Wins!";
        }

        if (this.AiPlayer.PlayerBoard.CheckTheGameend()) {
            this.RealPlayer.Win += 1;
            this.AiPlayer.Lose += 1;
            this.is_game_over = true;
            return "Player Wins!";
        }

        return null;
    }
}
