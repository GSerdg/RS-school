// import './foarm.scss';
import { createViewHtml } from '../../modules/create-html';
import { findDomElement } from '../../modules/find-dom-element';
import { levelData } from '../../modules/level-data';
const level = 2;
const VIEWER = findDomElement(document.body, '.text-foarm_viewer');
const INPUT = findDomElement(document.body, '.input');

function addRemoveInputStrobe(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target.tagName !== 'INPUT') return;
  if (target.value.length > 0) {
    target.classList.remove('input_strobe');
  } else {
    target.classList.add('input_strobe');
  }
}

VIEWER.append(createViewHtml(levelData[level]));
INPUT.addEventListener('input', addRemoveInputStrobe);
