import { Data, Tag } from '../types/types';
import { createElement } from './create-element';
import { curentLevel, results } from './level-data';

export function createLevelsElement(data: Data<Tag>) {
  const UL = createElement('ul', ['levels']);
  const keys = Object.keys(data);

  for (let i = 1; i < keys.length + 1; i += 1) {
    const LI = createElement('li', ['levels__list'], `${i}`, `level ${i}`);

    if (i === curentLevel.indexOf('curent') + 1) {
      LI.classList.add('levels__list_light');
    }
    if (results[i - 1] === 'win') {
      console.log(results);
      LI.classList.add('levels__list_win');
    }
    if (results[i - 1] === 'help') {
      LI.classList.add('levels__list_help');
    }

    UL.append(LI);
  }

  return UL;
}
