import { findDomElement } from './find-dom-element';

export function deleteInputText() {
  const INPUT = findDomElement(document.body, '.input') as HTMLInputElement;
  INPUT.value = '';
}
