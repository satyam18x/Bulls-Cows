public class NumberValidator {

    public boolean isValidNumber(String number) {

        // Check null
        if (number == null) {
            return false;
        }

        // Check length
        if (number.length() != 4) {
            return false;
        }

        // Check digits only
        for (char ch : number.toCharArray()) {
            if (!Character.isDigit(ch)) {
                return false;
            }
        }

        // Check first digit is not 0
        if (number.charAt(0) == '0') {
            return false;
        }

        // Check unique digits
        for (int i = 0; i < number.length(); i++) {
            for (int j = i + 1; j < number.length(); j++) {
                if (number.charAt(i) == number.charAt(j)) {
                    return false;
                }
            }
        }

        return true;
    }
}