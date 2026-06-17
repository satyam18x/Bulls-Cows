import { GuessRecord } from "./GuessRecord";

export interface GameState {
    secretNumber: string;
    guesses: GuessRecord[];
    gameOver: boolean;
}