// git push origin game-engine
public class GameEngine {

    public GuessResult checkGuess(String secret, String guess) {

        int bulls = 0;
        int cows = 0;

        for (int i = 0; i < 4; i++) {

            if (guess.charAt(i) == secret.charAt(i)) {
                bulls++;
            }
            else if (secret.indexOf(guess.charAt(i)) != -1) {
                cows++;
            }
        }

        return new GuessResult(bulls, cows);
    }

    public boolean isWinner(GuessResult result) {
    return result.getBulls() == 4;
}

}