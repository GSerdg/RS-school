import { Levels } from '../types/types';
import { createElement } from './create-element';
import { curentLevel, results } from './level-data';

export function createLevelsElement(data: Levels) {
  const UL = createElement('ul', ['levels']);
  const keys = Object.keys(data);

  for (let i = 1; i < keys.length + 1; i += 1) {
    const LI = createElement('li', ['levels__list'], `${i}`, `level ${i}`);

    if (i === curentLevel.indexOf('curent') + 1) {
      LI.classList.add('levels__list_light');
    }
    if (i === results.indexOf('win') + 1) {
      LI.classList.add('levels__list_win');
    }
    if (i === results.indexOf('help') + 1) {
      LI.classList.add('levels__list_help');
    }

    UL.append(LI);
  }

  return UL;
}
