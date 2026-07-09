import TcpSocket from 'react-native-tcp-socket';
import { GameMessage } from './MessageTypes';

export class GameClient {
  private socket: any;
  private timeoutHandle: any;
  private connected: boolean = false; // track if connection succeeded
  public onMessage: (msg: GameMessage) => void;

  constructor(onMessage: (msg: GameMessage) => void) {
    this.onMessage = onMessage;
  }

  connect(
    hostIP: string,
    port: number = 8080,
    onConnected?: () => void,
    onError?: (reason: string) => void,
  ) {
    this.connected = false;

    this.timeoutHandle = setTimeout(() => {
      if (!this.connected) {
        this.socket?.destroy();
        if (onError) onError('timeout');
      }
    }, 5000);

    this.socket = TcpSocket.createConnection(
      { host: hostIP, port },
      () => {
        this.connected = true;
        clearTimeout(this.timeoutHandle);
        console.log('Connected to host');
        if (onConnected) onConnected();
      }
    );

    this.socket.on('data', (data: any) => {
      const msg: GameMessage = JSON.parse(data.toString());
      this.onMessage(msg);
    });

    this.socket.on('error', (err: any) => {
      clearTimeout(this.timeoutHandle);
      console.log('Connection error', err);
      // Only fire onError if we never successfully connected
      if (!this.connected && onError) {
        onError('error');
      }
    });

    this.socket.on('close', () => {
      clearTimeout(this.timeoutHandle);
      console.log('Disconnected from host');
    });
  }

  send(msg: GameMessage) {
    this.socket?.write(JSON.stringify(msg));
  }

  disconnect() {
    clearTimeout(this.timeoutHandle);
    this.socket?.destroy();
  }
}