import { GameState } from "../models/GameState";
import { PlayerRole } from "../models/PlayerRole";
import { GuessRecord } from "../models/GuessRecord";

import { NumberValidator } from "./NumberValidator";
import { BullsCowsCalculator } from "./BullsCowsCalculator";

export class GameEngine {

    private state: GameState;

    constructor(
        mySecretNumber: string,
        opponentSecretNumber: string
    ) {

        this.state = {

            mySecretNumber,

            opponentSecretNumber,

            myHistory: [],

            opponentHistory: [],

            currentTurn: "HOST",

            gameOver: false
        };
    }

    submitGuess(
        player: PlayerRole,
        guess: string
    ): GuessRecord {

        // Game already ended
        if (this.state.gameOver) {
            throw new Error(
                "Game is already over"
            );
        }

        // Turn validation
        if (
            player !== this.state.currentTurn
        ) {
            throw new Error(
                "Not your turn"
            );
        }

        // Guess validation
        if (
            !NumberValidator.isValid(
                guess
            )
        ) {
            throw new Error(
                "Invalid guess"
            );
        }

        // Determine target number
        const targetNumber =
            player === "HOST"
                ? this.state.opponentSecretNumber
                : this.state.mySecretNumber;

        // Calculate result
        const result =
            BullsCowsCalculator.calculate(
                targetNumber,
                guess
            );

        const record: GuessRecord = {

            guess,

            bulls: result.bulls,

            cows: result.cows
        };

        // Store history
        if (player === "HOST") {

            this.state.myHistory.push(
                record
            );

        } else {

            this.state.opponentHistory.push(
                record
            );
        }

        // Winner detection
        if (result.bulls === 4) {

            this.state.gameOver = true;

            this.state.winner = player;

            return record;
        }

        // Switch turn
        this.state.currentTurn =

            this.state.currentTurn ===
            "HOST"

                ? "JOINER"

                : "HOST";

        return record;
    }

    getState(): GameState {

        return this.state;
    }

    getWinner():
        PlayerRole | undefined {

        return this.state.winner;
    }

    isGameOver(): boolean {

        return this.state.gameOver;
    }

    restartGame(
        mySecretNumber: string,
        opponentSecretNumber: string
    ): void {

        this.state = {

            mySecretNumber,

            opponentSecretNumber,

            myHistory: [],

            opponentHistory: [],

            currentTurn: "HOST",

            gameOver: false,

            winner: undefined
        };
    }
}