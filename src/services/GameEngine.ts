import { GameState } from "../models/GameState";
import { GuessResult } from "../models/GuessResult";
import { GuessRecord } from "../models/GuessRecord";

import { NumberValidator } from "./NumberValidator";
import { BullsCowsCalculator } from "./BullsCowsCalculator";

export class GameEngine {

    private state: GameState;

    constructor(secretNumber: string) {

        this.state = {
            secretNumber,
            guesses: [],
            gameOver: false
        };
    }

    submitGuess(
        guess: string
    ): GuessResult {

        if (
            !NumberValidator.isValid(guess)
        ) {
            throw new Error(
                "Invalid Guess"
            );
        }

        const result =
            BullsCowsCalculator.calculate(
                this.state.secretNumber,
                guess
            );

        const record: GuessRecord = {
            guess,
            result
        };

        this.state.guesses.push(
            record
        );

        if (result.bulls === 4) {
            this.state.gameOver = true;
        }

        return result;
    }

    getHistory() {
        return this.state.guesses;
    }

    isGameOver() {
        return this.state.gameOver;
    }

    getState(): GameState {
    return this.state;
}

getSecretNumber(): string {
    return this.state.secretNumber;
}

restartGame(
    secretNumber: string
): void {

    this.state = {
        secretNumber,
        guesses: [],
        gameOver: false
    };
}


}