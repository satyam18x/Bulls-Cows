export class NumberValidator {

    static isValid(number: string): boolean {

        // Must be exactly 4 digits
        if (number.length !== 4) {
            return false;
        }

        // Must contain only digits
        if (!/^\d+$/.test(number)) {
            return false;
        }

        // First digit cannot be 0
        if (number[0] === "0") {
            return false;
        }

        // All digits must be unique
        return new Set(number).size === 4;
    }
}