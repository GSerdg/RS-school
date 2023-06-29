// import { findDomElement } from './find-dom-element';

export function removeLevel() {
  // const TEXT_FOARM_CODE = findDomElement(document.body, '.text-foarm__code');
  // const ANIMATION_ELEMENTS = findDomElement(document.body, '.animation__elements');
  const TEXT_FOARM_CODE = document.body.querySelector('.text-foarm__code');
  const ANIMATION_ELEMENTS = document.body.querySelector('.animation__elements');

  TEXT_FOARM_CODE?.remove();
  ANIMATION_ELEMENTS?.remove();
}
