import { GuessResult } from "../models/GuessResult";

export class BullsCowsCalculator {

    static calculate(
        secret: string,
        guess: string
    ): GuessResult {

        let bulls = 0;
        let cows = 0;

        for (let i = 0; i < 4; i++) {

            if (guess[i] === secret[i]) {
                bulls++;
            }
            else if (
                secret.includes(guess[i])
            ) {
                cows++;
            }
        }

        return {
            bulls,
            cows
        };
    }
}