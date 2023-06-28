import './foarm.scss';
import { findDomElement } from '../../modules/find-dom-element';
import { curentLevel } from '../../modules/level-data';
import { Level } from '../../types/types';
import { checkUnswer } from '../../modules/check-unswer';

const INPUT = findDomElement(document.body, '.input') as HTMLInputElement;
const BUTTON = findDomElement(document.body, '.btn');
const FOARMS = findDomElement(document.body, '.foarms');

function deleteAnimationClass(event: Event) {
  const target = event.target as HTMLDivElement;
  if (target.classList[0] !== 'foarms') return;
  target.classList.remove('foarms_animation');
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
