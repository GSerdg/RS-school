export interface Tag {
  value: string;
  class: string | null;
  id: string | null;
  inside: Tag[] | null;
}

export interface Levels {
  1: Tag[];
  2: Tag[];
  3: Tag[];
  4: Tag[];
  5: Tag[];
  6: Tag[];
  7: Tag[];
  8: Tag[];
  9: Tag[];
  10: Tag[];
}

export type Level = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
