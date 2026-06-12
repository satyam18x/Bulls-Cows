
public class MatchManager {

    private Player player1;
    private Player player2;

    private GameState gameState;
    private GameEngine gameEngine;

    private Player winner;

    private NumberValidator validator =
        new NumberValidator();

    public MatchManager(Player player1,
            Player player2) {

        this.player1 = player1;
        this.player2 = player2;

        this.gameState = new GameState();
        this.gameEngine = new GameEngine();
    }

    public Player getCurrentPlayer() {

        if (gameState.isPlayer1Turn()) {
            return player1;
        }

        return player2;
    }

    public Player getOpponent() {

        if (gameState.isPlayer1Turn()) {
            return player2;
        }

        return player1;
    }

    public GameState getGameState() {
        return gameState;
    }

    public Player getWinner() {
        return winner;
    }

    public GuessResult submitGuess(String guess) {

        Player currentPlayer = getCurrentPlayer();

        Player opponent = getOpponent();

        if (!validator.isValidNumber(guess)) {
            throw new IllegalArgumentException(
                    "Invalid guess: " + guess
            );
        }

        GuessResult result
                = gameEngine.checkGuess(
                        opponent.getSecretNumber(),
                        guess
                );

        GuessRecord record
                = new GuessRecord(
                        currentPlayer.getName(),
                        guess,
                        result.getBulls(),
                        result.getCows()
                );

        gameState.addRecord(record);

        if (gameEngine.isWinner(result)) {

            winner = currentPlayer;

            gameState.setGameOver(true);
        } else {

            gameState.switchTurn();
        }

        return result;
    }

    public boolean isGameOver() {
        return gameState.isGameOver();
    }

    public boolean isPlayer1Turn() {
        return gameState.isPlayer1Turn();
    }

    
}
