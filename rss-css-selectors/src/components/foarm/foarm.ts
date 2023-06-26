import './foarm.scss';
// import { createViewHtml } from '../../modules/create-html';
import { findDomElement } from '../../modules/find-dom-element';
// import { level, levelData } from '../../modules/level-data';

const INPUT = findDomElement(document.body, '.input');
const BUTTON = findDomElement(document.body, '.btn');

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

  if (value === 'div') alert('Rite');
}

function submitInputPressEnter(event: Event) {
  const target = event.target as HTMLInputElement;
  let value: string;

  if ((event as KeyboardEvent).code === 'Enter') {
    value = target.value;
    if (value === 'div') alert('Rite');
  }
}

INPUT.addEventListener('input', addRemoveInputStrobe);
INPUT.addEventListener('keyup', submitInputPressEnter);
BUTTON.addEventListener('click', submitInputClickButton);
