import { findDomElement } from './find-dom-element';

export function deleteInputText() {
  const INPUT = findDomElement<HTMLInputElement>(document.body, '.input');
  INPUT.value = '';
}
