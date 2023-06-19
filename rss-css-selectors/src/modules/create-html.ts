import { createElement } from './createElement';
import { Tag } from '../types/types';

function createLevelHtml(data: Tag[]) {
  const ELEMENTS: HTMLElement[] = [];

  data.forEach((item) => {
    let TEXT_OPEN = `<${item.value}`;
    const TEXT_CLOSED = `</${item.value}>`;
    let CHILD_ELEMENTS: HTMLElement[] | undefined;

    if (item.id) {
      TEXT_OPEN += ` id="${item.id}"`;
    }
    if (item.class) {
      TEXT_OPEN += ` class="${item.class}"`;
    }
    if (item.inside) {
      TEXT_OPEN += '>';
      CHILD_ELEMENTS = createLevelHtml(item.inside);
    } else {
      TEXT_OPEN += ' />';
    }

    const STR_OPEN = createElement('p', ['tag', 'tag_open']);
    const STR_OPEN_SPAN = createElement('span', ['tag__text', 'tag__text_open'], undefined, TEXT_OPEN);
    STR_OPEN.append(STR_OPEN_SPAN);
    STR_OPEN.setAttribute('style', `padding-left: 30px`);
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

function addSelectForElements(event: Event) {
  const target = event.target as HTMLElement;
  if (target.tagName !== 'SPAN') return;

  const parentElement = target.closest('.tag_open');
  parentElement?.classList.add('tag_light');
}

export function createViewHtml(data: Tag[]) {
  const TEXT_FOARM_CODE = createElement('div', ['text-foarm__code']);
  const STR_1_OPEN = createElement('p', ['tag', 'tag_open'], 'open-1', '<div class="table">');
  const STR_1_CLOSED = createElement('p', ['tag', 'tag_closed'], 'closed-1', '</div>');

  TEXT_FOARM_CODE.append(STR_1_OPEN);
  STR_1_OPEN.append(...createLevelHtml(data));
  STR_1_OPEN.append(STR_1_CLOSED);

  TEXT_FOARM_CODE.addEventListener('mouseover', addSelectForElements);
  // TEXT_FOARM_CODE.addEventListener('mouseout', removeSelectForElements);
  return TEXT_FOARM_CODE;
}
