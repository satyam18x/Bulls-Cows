import { GuessRecord } from "./GuessRecord";
import { PlayerRole } from "./PlayerRole";

export interface GameState {

    mySecretNumber: string;

    opponentSecretNumber: string;

    myHistory: GuessRecord[];

    opponentHistory: GuessRecord[];

    currentTurn: PlayerRole;

    gameOver: boolean;

    winner?: PlayerRole;
}