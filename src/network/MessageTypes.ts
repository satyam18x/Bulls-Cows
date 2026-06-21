export type MessageType =
  | 'SET_SECRET'
  | 'GAME_START'
  | 'GUESS'
  | 'GUESS_RESULT'
  | 'GAME_OVER';

export interface GameMessage {
  type: MessageType;
  payload: any;
}