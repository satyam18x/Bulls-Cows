public class MatchSimulation {

    public static void main(String[] args) {

        Player p1 =
                new Player("Player1", "5831");

        Player p2 =
                new Player("Player2", "7204");

        MatchManager match =
                new MatchManager(p1, p2);

        match.submitGuess("1234");

        match.submitGuess("5831");

        match.submitGuess("7204");

        for (GuessRecord record :
                match.getGameState().getHistory()) {

            System.out.println(record);
        }

        if (match.isGameOver()) {

            System.out.println(
                    "Winner: "
                    + match.getWinner().getName()
            );
        }
    }
}