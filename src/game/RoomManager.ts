import { Room } from "../models/Room";
import { GameEngine }
    from "../services/GameEngine";

export class RoomManager {

    private rooms:
        Map<string, Room>;

    constructor() {

        this.rooms =
            new Map();
    }

    private generateRoomCode():
        string {

        return Math.floor(
            1000 +
            Math.random() * 9000
        ).toString();
    }

    createRoom(): Room {

        const roomCode =
            this.generateRoomCode();

        const room: Room = {

            roomCode,

            hostConnected: true,

            joinerConnected: false
        };

        this.rooms.set(
            roomCode,
            room
        );

        return room;
    }

    joinRoom(
        roomCode: string
    ): Room {

        const room =
            this.rooms.get(
                roomCode
            );

        if (!room) {

            throw new Error(
                "Room not found"
            );
        }

        room.joinerConnected =
            true;

        return room;
    }

    setHostSecret(
        roomCode: string,
        secret: string
    ): void {

        const room =
            this.rooms.get(roomCode);

        if (!room) {
            throw new Error(
                "Room not found"
            );
        }

        room.hostSecret = secret;
    }

    setJoinerSecret(
        roomCode: string,
        secret: string
    ): void {

        const room =
            this.rooms.get(roomCode);

        if (!room) {
            throw new Error(
                "Room not found"
            );
        }

        room.joinerSecret = secret;
    }
    canStartGame(
        roomCode: string
    ): boolean {

        const room =
            this.rooms.get(roomCode);

        if (!room) {
            return false;
        }

        return !!(
            room.hostSecret &&
            room.joinerSecret
        );
    }

    startGame(
        roomCode: string
    ): GameEngine {

        const room =
            this.rooms.get(roomCode);

        if (!room) {
            throw new Error(
                "Room not found"
            );
        }

        if (
            !room.hostSecret ||
            !room.joinerSecret
        ) {
            throw new Error(
                "Secrets not ready"
            );
        }

        const game =
            new GameEngine(
                room.hostSecret,
                room.joinerSecret
            );

        room.gameEngine = game;

        return game;
    }

    getRoom(
        roomCode: string
    ): Room | undefined {

        return this.rooms.get(
            roomCode
        );
    }

    getGameState(
        roomCode: string
    ) {

        const room =
            this.rooms.get(
                roomCode
            );

        if (
            !room ||
            !room.gameEngine
        ) {
            throw new Error(
                "Game not started"
            );
        }

        return room
            .gameEngine
            .getState();
    }

    resetMatch(
        roomCode: string,
        hostSecret: string,
        joinerSecret: string
    ): void {

        const room =
            this.rooms.get(
                roomCode
            );

        if (!room) {

            throw new Error(
                "Room not found"
            );
        }

        room.hostSecret =
            hostSecret;

        room.joinerSecret =
            joinerSecret;

        room.gameEngine =
            new GameEngine(
                hostSecret,
                joinerSecret
            );
    }

    destroyRoom(
        roomCode: string
    ): void {

        this.rooms.delete(
            roomCode
        );
    }

    getRoomCount(): number {

        return this.rooms.size;
    }
}