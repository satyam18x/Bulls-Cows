public class Main {

    public static void main(String[] args) {

        Player p1 =
                new Player(
                        "Player1",
                        "5831"
                );

        Player p2 =
                new Player(
                        "Player2",
                        "7204"
                );

        MatchManager match =
                new MatchManager(
                        p1,
                        p2
                );

        GuessResult result =
                match.submitGuess("7204");

        System.out.println(result);

        System.out.println(
                match.getWinner()
        );
    }

    
}