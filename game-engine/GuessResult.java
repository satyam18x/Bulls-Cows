public class GuessResult {

    private int bulls;
    private int cows;

    public GuessResult(int bulls, int cows) {
        this.bulls = bulls;
        this.cows = cows;
    }

    public int getBulls() {
        return bulls;
    }

    public int getCows() {
        return cows;
    }

    @Override
    public String toString() {
        return bulls + " Bulls, " + cows + " Cows";
    }
}