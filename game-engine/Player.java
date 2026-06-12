public class Player {

    private String name;
    private String secretNumber;

    public Player(String name, String secretNumber) {
        this.name = name;
        this.secretNumber = secretNumber;
    }

    public String getName() {
        return name;
    }

    public String getSecretNumber() {
        return secretNumber;
    }

    public void setSecretNumber(String secretNumber) {
        this.secretNumber = secretNumber;
    }

    @Override
    public String toString() {
        return "Player{name='" + name +
                "', secretNumber='" +
                secretNumber + "'}";
    }
}