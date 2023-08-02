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

export type EngineStatus = 'started' | 'stopped';

export interface Winner {
  id: number;
  wins: number;
  time: number;
}

export interface SortObject {
  sortBy?: SortBy;
  orderBy?: OrderBy;
}

export interface PageData {
  page: number;
  limit: 7 | 10;
  count: number;
}

export type SortBy = 'id' | 'wins' | 'time';
export type OrderBy = 'ASC' | 'DESC';
