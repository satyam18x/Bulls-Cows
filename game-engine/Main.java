public class Main {

    public static void main(String[] args) {

        GameState state = new GameState();

        state.addRecord(
                new GuessRecord(
                        "Player1",
                        "5138",
                        2,
                        2
                )
        );

        state.addRecord(
                new GuessRecord(
                        "Player2",
                        "7204",
                        1,
                        1
                )
        );

        for (GuessRecord record :
                state.getHistory()) {

            System.out.println(record);
        }
    }
}