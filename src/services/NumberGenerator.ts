export class NumberGenerator {

    static generate(): string {

        const digits: string[] = [];

        while (digits.length < 4) {

            const randomDigit =
                Math.floor(
                    Math.random() * 10
                ).toString();

            if (
                digits.length === 0 &&
                randomDigit === "0"
            ) {
                continue;
            }

            if (
                !digits.includes(
                    randomDigit
                )
            ) {
                digits.push(
                    randomDigit
                );
            }
        }

        return digits.join("");
    }
}