export interface Car {
  name: string;
  color: string;
  id: number;
}

export interface Engine {
  velocity: number;
  distance: number;
}

export interface Success {
  success: true;
}

export type Status = 'started' | 'stopped';

export interface Winner {
  id: number;
  wins: number;
  time: number;
}
