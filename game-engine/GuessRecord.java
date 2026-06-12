public class GuessRecord {

    private String player;
    private String guess;
    private int bulls;
    private int cows;

    public GuessRecord(String player,
                       String guess,
                       int bulls,
                       int cows) {

        this.player = player;
        this.guess = guess;
        this.bulls = bulls;
        this.cows = cows;
    }

    public String getPlayer() {
        return player;
    }

    public String getGuess() {
        return guess;
    }

    public int getBulls() {
        return bulls;
    }

    public int getCows() {
        return cows;
    }

    @Override
    public String toString() {
        return player + " -> "
                + guess + " : "
                + bulls + "B "
                + cows + "C";
    }
}