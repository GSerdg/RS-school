import { createElement } from './create-element';
import { Tag } from '../types/types';
import { findDomElement } from './find-dom-element';
import { createClue } from './create-clue';

let id = 0;

// Создает текст HTML разметки с вложенностью в соответствии с выбранным уровнем
function createPsevdoHtml(data: Tag[]) {
  const ELEMENTS: HTMLElement[] = [];

  data.forEach((item) => {
    id += 1;
    let TEXT_OPEN = `<${item.value}`;
    const TEXT_CLOSED = `</${item.value}>`;
    let CHILD_ELEMENTS: HTMLElement[] | undefined;
    const STR_OPEN = createElement('p', ['tag', 'tag_open']);

    STR_OPEN.setAttribute('style', `padding-left: 30px`);
    STR_OPEN.setAttribute('id', `text${id}`);

    if (item.id) {
      TEXT_OPEN += ` id="${item.id}"`;
    }
    if (item.class) {
      TEXT_OPEN += ` class="${item.class}"`;
    }
    if (item.inside) {
      TEXT_OPEN += '>';
      CHILD_ELEMENTS = createPsevdoHtml(item.inside);
    } else {
      TEXT_OPEN += ' />';
    }

    const STR_OPEN_SPAN = createElement('span', ['tag__text', 'tag__text_open'], undefined, TEXT_OPEN);

    STR_OPEN.append(STR_OPEN_SPAN);
    ELEMENTS.push(STR_OPEN);

    if (CHILD_ELEMENTS) {
      const STR_CLOSED = createElement('p', ['tag', 'tag_closed']);
      const STR_CLOSED_SPAN = createElement('span', ['tag__text', 'tag__text_closed'], undefined, TEXT_CLOSED);

      STR_OPEN.append(...CHILD_ELEMENTS);
      STR_CLOSED.append(STR_CLOSED_SPAN);
      STR_OPEN.append(STR_CLOSED);
    }
  });

  return ELEMENTS;
}

// Добавляет класс для подсветки текста при наведении мыши
function selectElements(event: MouseEvent) {
  const target = event.target as HTMLElement;
  if (target.tagName !== 'SPAN') return;

  const parentElement = target.closest('.tag_open');
  const targetId = (parentElement?.getAttribute('id') as string).match(/\d+/);
  const IMG = findDomElement(document.body, `#img${targetId}`);
  const ANIMATION = findDomElement(document.body, '.container');
  const coords = IMG.getBoundingClientRect();

  if (event.type === 'mouseover') {
    const POPUP = createClue(IMG);

    parentElement?.classList.add('tag_light');
    IMG.classList.add('image_light');
    POPUP.setAttribute('style', `top:${coords.y - 30}px; left:${coords.x}px`);
    ANIMATION.append(POPUP);
  }
  if (event.type === 'mouseout') {
    const POPUP = ANIMATION.lastElementChild;

    parentElement?.classList.remove('tag_light');
    IMG.classList.remove('image_light');
    POPUP?.remove();
  }
}

export function createViewHtml(data: Tag[]) {
  const TEXT_FOARM_CODE = createElement('div', ['text-foarm__code']);
  const STR_1_OPEN = createElement('p', ['tag', 'tag_open'], 'open-1', '<div class="field">');
  const STR_1_CLOSED = createElement('p', ['tag', 'tag_closed'], 'closed-1', '</div>');

  TEXT_FOARM_CODE.append(STR_1_OPEN);
  STR_1_OPEN.append(...createPsevdoHtml(data));
  STR_1_OPEN.append(STR_1_CLOSED);

  TEXT_FOARM_CODE.addEventListener('mouseover', selectElements);
  TEXT_FOARM_CODE.addEventListener('mouseout', selectElements);

  id = 0;

  return TEXT_FOARM_CODE;
}
