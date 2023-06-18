export interface Tag {
  value: string;
  class: string | null;
  id: string | null;
  inside: Tag[] | null;
}

export interface Levels {
  1: Tag[];
  2: Tag[];
}
