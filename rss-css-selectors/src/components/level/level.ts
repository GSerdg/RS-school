import './level.scss';
import { createLevelsElement } from '../../modules/create-levels';
import { createElement } from '../../modules/create-element';
import { levelData, levelUnswer, results } from '../../modules/level-data';
import { findDomElement } from '../../modules/find-dom-element';
import { createNewLevel } from '../../modules/create-new-level';
import { Level } from '../../types/types';
import { removeLevel } from '../../modules/remove-level';
import { curentLevel } from '../../modules/level-data';

const HEADER = createElement('h2', ['right-field__title'], undefined, 'Level');
const RESET_BTN = createElement('button', ['btn'], undefined, 'Reset progress');
const HELP_BTN = createElement('button', ['btn'], undefined, 'Help');
const LEVELS_LIST = createLevelsElement(levelData);
const RIGHT_FIELD = findDomElement(document.body, '.right-field');

async function addText(event: MouseEvent) {
  const target = event.target as HTMLElement;
  if (target.tagName !== 'BUTTON') return;

  const curLevel = (curentLevel.indexOf('curent') + 1) as Level;
  const unswer = levelUnswer[curLevel][0];
  const INPUT = findDomElement(document.body, '.input') as HTMLInputElement;
  const LEVEL = findDomElement(document.body, '.levels__list_light');

  INPUT.value = '';

  for (const value of unswer) {
    const promise = new Promise(function (res) {
      setTimeout(() => {
        res('');
      }, 100);
    });
    await promise;
    INPUT.value += value;
  }
  results[curLevel - 1] = 'help';
  LEVEL.classList.add('levels__list_help');
}

function resetLevelList(event: MouseEvent) {
  const target = event.target as HTMLElement;
  if (target.tagName !== 'BUTTON') return;

  Array.from(LEVELS_LIST.children).forEach((item) => {
    item.classList.remove(...['levels__list_help', 'levels__list_win']);
  });
  results.fill(null);
}

function loadLevel(event: MouseEvent) {
  const target = event.target as HTMLElement;
  if (target.tagName !== 'LI') return;

  const id = +target.id as Level;
  const LEVEL_BEFORE = findDomElement(document.body, '.levels__list_light');

  LEVEL_BEFORE.classList.remove('levels__list_light');
  target.classList.add('levels__list_light');
  curentLevel[curentLevel.indexOf('curent')] = null;

  removeLevel();
  createNewLevel(id);
}

RIGHT_FIELD.append(HEADER, LEVELS_LIST, RESET_BTN, HELP_BTN);

LEVELS_LIST.addEventListener('click', loadLevel);
RESET_BTN.addEventListener('click', resetLevelList);
HELP_BTN.addEventListener('click', addText);
