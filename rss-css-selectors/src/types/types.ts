export interface Tag {
  value: string;
  class: string | null;
  id: string | null;
  animation: boolean;
  inside: Tag[] | null;
}

export interface Data<T> {
  1: T[];
  2: T[];
  3: T[];
  4: T[];
  5: T[];
  6: T[];
  7: T[];
  8: T[];
  9: T[];
  10: T[];
}

export type Level = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
