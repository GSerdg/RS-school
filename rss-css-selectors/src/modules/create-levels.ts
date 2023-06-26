import { Levels } from '../types/types';
import { createElement } from './create-element';

export function createLevelsElement(data: Levels) {
  const UL = createElement('ul', ['levels']);
  const keys = Object.keys(data);

  for (let i = 1; i < keys.length + 1; i += 1) {
    const LI = createElement('li', ['levels__list'], `${i}`, `level ${i}`);
    UL.append(LI);
  }

  return UL;
}
