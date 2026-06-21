import TcpSocket from 'react-native-tcp-socket';
import { GameMessage } from './MessageTypes';

export class GameServer {
  private server: any;
  private clientSocket: any;
  public onMessage: (msg: GameMessage) => void;

  constructor(onMessage: (msg: GameMessage) => void) {
    this.onMessage = onMessage;
  }

  start(port: number = 8080) {
    this.server = TcpSocket.createServer((socket) => {
      this.clientSocket = socket;

      socket.on('data', (data) => {
        const msg: GameMessage = JSON.parse(data.toString());
        this.onMessage(msg);
      });

      socket.on('error', (err) => console.log('Client error', err));
      socket.on('close', () => console.log('Client disconnected'));
    });

    this.server.listen({ port, host: '0.0.0.0' });
    console.log(`Server started on port ${port}`);
  }

  send(msg: GameMessage) {
    if (this.clientSocket) {
      this.clientSocket.write(JSON.stringify(msg));
    }
  }

  stop() {
    this.server?.close();
  }
}