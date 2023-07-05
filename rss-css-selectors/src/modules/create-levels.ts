import { Data, Level, Tag } from '../types/types';
import { createElement } from './create-element';
import { getCurrentLevel } from './get-current-level';
import { results, useHelp, winGame } from './level-data';

export function createLevelsElement(data: Data<Tag>) {
  const UL = createElement('ul', ['levels']);
  const keys = Object.keys(data);

  for (let i = 1; i < keys.length + 1; i += 1) {
    const LI = createElement('li', ['levels__list'], `${i}`, `level ${i}`);

    if (i === getCurrentLevel<Level>() || (getCurrentLevel<number>() === 0 && i === 1)) {
      LI.classList.add('levels__list_light');
    }
    if (results[i - 1] === winGame) {
      console.log(results);
      LI.classList.add('levels__list_win');
    }
    if (results[i - 1] === useHelp) {
      LI.classList.add('levels__list_help');
    }

    UL.append(LI);
  }

  return UL;
}
