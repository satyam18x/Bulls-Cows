public class Main {

    public static void main(String[] args) {

        NumberValidator validator = new NumberValidator();

        System.out.println(validator.isValidNumber("5831"));
        System.out.println(validator.isValidNumber("0123"));
        System.out.println(validator.isValidNumber("1123"));
        System.out.println(validator.isValidNumber("123"));
        System.out.println(validator.isValidNumber("12A3"));
    }
} 