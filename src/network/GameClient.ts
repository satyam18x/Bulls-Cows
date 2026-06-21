import TcpSocket from 'react-native-tcp-socket';
import { GameMessage } from './MessageTypes';

export class GameClient {
  private socket: any;
  public onMessage: (msg: GameMessage) => void;

  constructor(onMessage: (msg: GameMessage) => void) {
    this.onMessage = onMessage;
  }

  connect(hostIP: string, port: number = 8080) {
    this.socket = TcpSocket.createConnection(
      { host: hostIP, port },
      () => console.log('Connected to host')
    );

    this.socket.on('data', (data: any) => {
      const msg: GameMessage = JSON.parse(data.toString());
      this.onMessage(msg);
    });

    this.socket.on('error', (err: any) => console.log('Connection error', err));
    this.socket.on('close', () => console.log('Disconnected from host'));
  }

  send(msg: GameMessage) {
    this.socket?.write(JSON.stringify(msg));
  }

  disconnect() {
    this.socket?.destroy();
  }
}