import { GameEngine } from "../services/GameEngine";

export let gameEngine: GameEngine;

export const createGame = (
  secretNumber: string
) => {
  gameEngine = new GameEngine(
    secretNumber
  );
};