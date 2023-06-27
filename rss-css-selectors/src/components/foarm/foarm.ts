import './foarm.scss';
import { findDomElement } from '../../modules/find-dom-element';
import { curentLevel, levelUnswer, results } from '../../modules/level-data';
import { Level } from '../../types/types';
import { createNewLevel } from '../../modules/create-new-level';
import { removeLevel } from '../../modules/remove-level';

const INPUT = findDomElement(document.body, '.input') as HTMLInputElement;
const BUTTON = findDomElement(document.body, '.btn');

const FOARMS = findDomElement(document.body, '.foarms');

function deleteAnimationClass(event: Event) {
  const target = event.target as HTMLDivElement;
  if (target.classList[0] !== 'foarms') return;
  target.classList.remove('foarms_animation');
}

function checkUnswer(selector: string, level: Level, help: boolean) {
  if (levelUnswer[level].includes(selector)) {
    const LEVEL = findDomElement(document.body, '.levels__list_light');
    const nextLevel = results.indexOf(null, level) + 1;
    curentLevel[level - 1] = null;
    LEVEL.classList.remove('levels__list_light');

    if (help) {
      LEVEL.classList.add('levels__list_help');
      results[level - 1] = 'help';
    } else {
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

function addRemoveInputStrobe(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target.tagName !== 'INPUT') return;
  if (target.value.length > 0) {
    target.classList.remove('input_strobe');
  } else {
    target.classList.add('input_strobe');
  }
}

function submitInputClickButton(event: Event) {
  const target = event.target as HTMLElement;
  const input = target.previousElementSibling as HTMLInputElement;
  const value = input?.value;

  checkUnswer(value, (curentLevel.indexOf('curent') + 1) as Level, false);
}

function submitInputPressEnter(event: Event) {
  const target = event.target as HTMLInputElement;
  let value: string;

  if ((event as KeyboardEvent).code === 'Enter') {
    value = target.value;
    checkUnswer(value, (curentLevel.indexOf('curent') + 1) as Level, false);
  }
}

INPUT.addEventListener('input', addRemoveInputStrobe);
INPUT.addEventListener('keyup', submitInputPressEnter);
BUTTON.addEventListener('click', submitInputClickButton);
FOARMS.addEventListener('animationend', deleteAnimationClass);
