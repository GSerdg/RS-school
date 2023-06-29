import { Level } from '../types/types';
import { createFinalPopup } from './create-final-popup';
import { createNewLevel } from './create-new-level';
import { findDomElement } from './find-dom-element';
import { curentLevel, levelUnswer, results } from './level-data';
import { removeLevel } from './remove-level';

export async function checkUnswer(selector: string, level: Level) {
  const INPUT = findDomElement(document.body, '.input') as HTMLInputElement;
  const FOARMS = findDomElement(document.body, '.foarms');

  if (levelUnswer[level].includes(selector)) {
    const LEVEL = findDomElement(document.body, '.levels__list_light');
    const IMG = Array.from(document.body.querySelectorAll('.choise-animation')) as HTMLElement[];
    let nextLevel = results.indexOf(null, level) + 1;

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

    INPUT.value = '';

    if (nextLevel === 0) {
      nextLevel = results.indexOf(null) + 1;
      if (nextLevel === 0) {
        document.body.prepend(createFinalPopup());
        removeLevel();
        return;
      }
    }

    const NEW_LEVEL = document.getElementById(`${nextLevel}`);

    NEW_LEVEL?.classList.add('levels__list_light');
    removeLevel();
    createNewLevel(nextLevel as Level);
    INPUT.classList.add('input_strobe');

    // INPUT.value = '';
  } else {
    FOARMS.classList.add('foarms_animation');
  }
}
