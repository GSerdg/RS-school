import './level.scss';
import { createLevelsElement } from '../../modules/create-levels';
import { createElement } from '../../modules/create-element';
import { levelData, levelUnswer, results } from '../../modules/level-data';
import { findDomElement } from '../../modules/find-dom-element';
import { createNewLevel } from '../../modules/create-new-level';
import { Level } from '../../types/types';
import { removeLevel } from '../../modules/remove-level';
import { curentLevel } from '../../modules/level-data';
import { deleteInputText } from '../../modules/delete-input-text';

const HEADER = createElement('h2', ['right-field__title'], undefined, 'Level');
const RESET_BTN = createElement('button', ['btn'], undefined, 'Reset progress');
const HELP_BTN = createElement('button', ['btn'], undefined, 'Help');
const LEVELS_LIST = createLevelsElement(levelData);
const RIGHT_FIELD = findDomElement(document.body, '.right-field');

async function addText(event: MouseEvent) {
  const target = event.target as HTMLElement;
  if (target.tagName !== 'BUTTON') return;

  const INPUT = findDomElement(document.body, '.input') as HTMLInputElement;
  const LEVEL = document.body.querySelector('.levels__list_light');
  const curLevel = (curentLevel.indexOf('curent') + 1) as Level;

  if (curLevel > 0) {
    const unswer = levelUnswer[curLevel][0];

    INPUT.value = '';

    for (const value of unswer) {
      const promise = new Promise(function (res) {
        setTimeout(() => {
          res('');
        }, 10);
      });
      await promise;
      INPUT.value += value;
    }
    results[curLevel - 1] = 'help';
  }

  LEVEL?.classList.add('levels__list_help');
  INPUT.focus();
}

function resetLevelList(event: MouseEvent) {
  const target = event.target as HTMLElement;
  if (target.tagName !== 'BUTTON') return;

  const LEVEL = LEVELS_LIST.querySelector('.levels__list_light') as HTMLElement | null;

  Array.from(LEVELS_LIST.children).forEach((item) => {
    item.classList.remove(...['levels__list_help', 'levels__list_win']);
  });
  results.fill(null);
  curentLevel.fill(null)[0] = 'curent';
  removeLevel();
  createNewLevel(1);
  LEVEL?.classList.remove('levels__list_light');
  LEVELS_LIST.firstElementChild?.classList.add('levels__list_light');
}

function loadLevel(event: MouseEvent) {
  const target = event.target as HTMLElement;
  if (target.tagName !== 'LI') return;

  const id = +target.id as Level;
  const LEVEL_BEFORE = document.body.querySelector('.levels__list_light');

  LEVEL_BEFORE?.classList.remove('levels__list_light');
  target.classList.add('levels__list_light');
  curentLevel[curentLevel.indexOf('curent')] = null;

  removeLevel();
  createNewLevel(id);
  deleteInputText();
}

RIGHT_FIELD.append(HEADER, LEVELS_LIST, RESET_BTN, HELP_BTN);

LEVELS_LIST.addEventListener('click', loadLevel);
RESET_BTN.addEventListener('click', resetLevelList);
HELP_BTN.addEventListener('click', addText);
