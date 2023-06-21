import { Tag } from '../types/types';
import { createElement } from './create-element';

function createAnimationElements(data: Tag[]) {
  const ELEMENTS: HTMLElement[] = [];

  data.forEach((item) => {
    const ELEMENT = createElement('div', [item.value]);
    const IMG = createElement('img', [`${item.value}__img`]);
    IMG.setAttribute('src', `./sources/images/${item.value}.png`);
    IMG.setAttribute('alt', item.value);
    ELEMENT.append(IMG);

    if (item.inside) {
      const CHILD_ELEMENTS = createAnimationElements(item.inside);
      ELEMENT.prepend(...CHILD_ELEMENTS);
    }

    ELEMENTS.push(ELEMENT);
  });

  return ELEMENTS;
}

export function createViewAnimationElements(data: Tag[]) {
  const CONTAINER = createElement('div', ['animation__elements']);
  CONTAINER.append(...createAnimationElements(data));
  return CONTAINER;
}
