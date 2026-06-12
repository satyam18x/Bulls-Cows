
public class Main {

    public static void main(String[] args) {

        GameEngine engine = new GameEngine();
        GuessResult result
                = engine.checkGuess("5831", "5831");

        System.out.println(
                engine.isWinner(result)
        );
    }
}
