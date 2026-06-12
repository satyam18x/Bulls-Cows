import java.util.Random;

public class SecretNumberGenerator {

    public String generate() {

        Random random = new Random();

        StringBuilder number = new StringBuilder();

        int firstDigit = random.nextInt(9) + 1;
        number.append(firstDigit);

        while (number.length() < 4) {

            int digit = random.nextInt(10);

            if (number.indexOf(String.valueOf(digit)) == -1) {
                number.append(digit);
            }
        }

        return number.toString();
    }
}
