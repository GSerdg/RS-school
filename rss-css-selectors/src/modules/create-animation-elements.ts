import { Tag } from '../types/types';
import { createElement } from './create-element';
import { findDomElement } from './find-dom-element';

let id = 0;

function lightningElements(event: MouseEvent) {
  const target = event.target as HTMLElement;
  if (target.tagName !== 'IMG') return;

  const id = target.id.match(/\d+/);
  const ELEMENT = findDomElement(document.body, `#text${id}`);

  if (event.type === 'mouseover') {
    ELEMENT.classList.add('tag_light');
  }
  if (event.type === 'mouseout') {
    ELEMENT.classList.remove('tag_light');
  }
}

function createAnimationElements(data: Tag[], count?: number) {
  const counter = count || 1;
  const ELEMENTS: HTMLElement[] = [];

  data.forEach((item) => {
    const ELEMENT = createElement('div', [item.value]);
    const IMG = createElement('img', [`${item.value}__img`]);

    id += 1;

    IMG.setAttribute('src', `./sources/images/${item.value}.png`);
    IMG.setAttribute('alt', item.value);
    IMG.setAttribute('id', `img${id}`);
    IMG.setAttribute('style', `z-index: ${counter}`);

    ELEMENT.append(IMG);

    if (item.class === 'small') {
      ELEMENT.classList.add(`${item.value}_small`);
    } else if (counter === 1) {
      ELEMENT.classList.add(`${item.value}_width`);
    }

    if (item.inside) {
      const CHILD_ELEMENTS = createElement('div', ['animation-child']);
      const CHILDREN = createAnimationElements(item.inside, counter + 1);
      CHILD_ELEMENTS.append(...CHILDREN);
      ELEMENT.prepend(CHILD_ELEMENTS);
    }

    ELEMENTS.push(ELEMENT);
  });

  return ELEMENTS;
}

export function createViewAnimationElements(data: Tag[]) {
  const CONTAINER = createElement('div', ['animation__elements']);

  CONTAINER.append(...createAnimationElements(data));

  CONTAINER.addEventListener('mouseover', lightningElements);
  CONTAINER.addEventListener('mouseout', lightningElements);

  return CONTAINER;
}
