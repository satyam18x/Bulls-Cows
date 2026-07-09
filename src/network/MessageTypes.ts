export type MessageType =
  | 'SET_SECRET'
  | 'GAME_START'
  | 'GUESS'
  | 'GUESS_RESULT'
  | 'GAME_OVER'
  | 'PLAYER_EXIT';  // add this

export interface GameMessage {
  type: MessageType;
  payload: any;
}