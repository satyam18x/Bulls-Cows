import java.util.ArrayList;
import java.util.List;

public class GameState {

    private boolean player1Turn;
    private boolean gameOver;

    private List<GuessRecord> history;

    public GameState() {

        this.player1Turn = true;
        this.gameOver = false;

        this.history = new ArrayList<>();
    }

    public boolean isPlayer1Turn() {
        return player1Turn;
    }

    public boolean isGameOver() {
        return gameOver;
    }

    public List<GuessRecord> getHistory() {
        return history;
    }

    public void switchTurn() {
        player1Turn = !player1Turn;
    }

    public void setGameOver(boolean gameOver) {
        this.gameOver = gameOver;
    }

    public void addRecord(GuessRecord record) {
        history.add(record);
    }
}