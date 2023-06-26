import './level.scss';
import { createLevelsElement } from '../../modules/create-levels';
import { createElement } from '../../modules/create-element';
import { levelData } from '../../modules/level-data';
import { findDomElement } from '../../modules/find-dom-element';
import { createNewLevel } from '../../modules/create-new-level';
import { Level } from '../../types/types';

const HEADER = createElement('h2', ['right-field__title'], undefined, 'Level');
const RESET_BTN = createElement('button', ['btn'], undefined, 'Reset progress');
const HELP_BTN = createElement('button', ['btn'], undefined, 'Help');
const LEVELS_LIST = createLevelsElement(levelData);
const RIGHT_FIELD = findDomElement(document.body, '.right-field');

function loadLevel(event: MouseEvent) {
  const target = event.target as HTMLElement;
  if (target.tagName !== 'LI') return;

  const id = +target.id as Level;
  const TEXT_FOARM_CODE = findDomElement(document.body, '.text-foarm__code');
  const ANIMATION_ELEMENTS = findDomElement(document.body, '.animation__elements');
  const LEVEL_BEFORE = findDomElement(document.body, '.levels__list_light');

  LEVEL_BEFORE.classList.remove('levels__list_light');
  target.classList.add('levels__list_light');
  TEXT_FOARM_CODE.remove();
  ANIMATION_ELEMENTS.remove();

  createNewLevel(id);
}

RIGHT_FIELD.append(HEADER, LEVELS_LIST, RESET_BTN, HELP_BTN);

LEVELS_LIST.addEventListener('click', loadLevel);
