import { player } from "./Player";

class GameController {
    constructor() {
        this.is_game_over = false;
        this.CurrenTurn = null;
        this.RealPlayer = new player();
        this.AiPlayer = new player();
        this.AiReady = false;
        this.AllShiplen = [5, 4, 3, 2, 2];
    }

    startGame() {
        this.CurrenTurn = "Player";
        this.is_game_over = false;
    }

    AttackandChangeTurn(X_axis = 0, Y_axis = 0) {
        if (this.CurrenTurn === "Player") {
            if (X_axis <= 8 && Y_axis <= 8) {
                this.AiPlayer.PlayerBoard.receiveAttack(X_axis, Y_axis);
                if (this.AiPlayer.PlayerBoard.CheckTheGameend()) {
                    this.RealPlayer.Win += 1;
                    this.AiPlayer.Lose += 1;
                    this.startGame();
                }
            }
        } else {
            const min = Math.ceil(0);
            const max = Math.floor(9);
            X_axis = Math.floor(Math.random() * (max - min + 1)) + min;
            Y_axis = Math.floor(Math.random() * (max - min + 1)) + min;
            if (X_axis <= 8 && Y_axis <= 8) {
                this.RealPlayer.PlayerBoard.receiveAttack(X_axis, Y_axis);
                if (this.RealPlayer.PlayerBoard.CheckTheGameend()) {
                    this.AiPlayer.Win += 1;
                    this.RealPlayer.Lose += 1;
                    this.startGame();
                }
            }
        }
    }

    CheckTheGameEnded() {
        
    }


}
