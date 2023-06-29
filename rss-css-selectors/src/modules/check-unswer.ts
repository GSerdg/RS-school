import { Level } from '../types/types';
import { createNewLevel } from './create-new-level';
import { findDomElement } from './find-dom-element';
import { curentLevel, levelUnswer, results } from './level-data';
import { removeLevel } from './remove-level';

export async function checkUnswer(selector: string, level: Level) {
  const INPUT = findDomElement(document.body, '.input') as HTMLInputElement;
  const FOARMS = findDomElement(document.body, '.foarms');

  if (levelUnswer[level].includes(selector)) {
    const LEVEL = findDomElement(document.body, '.levels__list_light');
    const nextLevel = results.indexOf(null, level) + 1;
    const IMG = Array.from(document.body.querySelectorAll('.choise-animation')) as HTMLElement[];

    IMG.forEach((item) => {
      item.setAttribute('style', 'top: -300px');
    });

    const promise = new Promise(function (res) {
      setTimeout(() => res('done'), 300);
    });
    await promise;
    curentLevel[level - 1] = null;
    LEVEL.classList.remove('levels__list_light');

    if (results[level - 1] !== 'help') {
      LEVEL.classList.add('levels__list_win');
      results[level - 1] = 'win';
    }

    if (nextLevel === 0) return;
    const NEW_LEVEL = document.getElementById(`${nextLevel}`);

    NEW_LEVEL?.classList.add('levels__list_light');
    removeLevel();
    createNewLevel(nextLevel as Level);
    INPUT.value = '';
    INPUT.classList.add('input_strobe');
  } else {
    FOARMS.classList.add('foarms_animation');
  }
}
