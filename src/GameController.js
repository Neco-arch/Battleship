import { player } from "./Player";

class GameController {
    constructor() {
        this.is_game_over = false;
        this.CurrenTurn = null;
        this.RealPlayer = new player();
        this.AiPlayer = new player();
    }

    startGame() {
        const AiPlayerboard = this.AiPlayer.CreatePlayerBoard();
        const Realplayerboard = RealPlayer.CreatePlayerBoard();
        this.CurrenTurn = "Player"
    }


}
