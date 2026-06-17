import { GameEngine }
from "./services/GameEngine";

import { NumberGenerator }
from "./services/NumberGenerator";

const secret =
    NumberGenerator.generate();

console.log(
    "Secret:",
    secret
);

const game =
    new GameEngine(secret);

console.log(
    game.getState()
);

game.submitGuess("1234");

console.log(
    game.getState()
);

game.restartGame(
    NumberGenerator.generate()
);

console.log(
    game.getState()
);