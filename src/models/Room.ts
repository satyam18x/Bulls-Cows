import { GameEngine } from "../services/GameEngine";

export interface Room {

    roomCode: string;

    hostConnected: boolean;

    joinerConnected: boolean;

    hostSecret?: string;

    joinerSecret?: string;

    gameEngine?: GameEngine;
}