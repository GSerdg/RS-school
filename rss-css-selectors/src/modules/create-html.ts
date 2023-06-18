import { createElement } from './createElement';
import { Tag } from '../types/types';

function createLevelHtml(data: Tag[], padding: number) {
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
      CHILD_ELEMENTS = createLevelHtml(item.inside, padding + 30);
    } else {
      TEXT_OPEN += ' />';
    }

    const STR_OPEN = createElement('p', ['code__tag'], undefined, TEXT_OPEN);
    STR_OPEN.setAttribute('style', `padding-left: ${padding}px`);
    ELEMENTS.push(STR_OPEN);
    if (CHILD_ELEMENTS) {
      ELEMENTS.push(...CHILD_ELEMENTS);
      const STR_CLOSED = createElement('p', ['code__tag'], undefined, TEXT_CLOSED);
      STR_CLOSED.setAttribute('style', `padding-left: ${padding}px`);
      ELEMENTS.push(STR_CLOSED);
    }
  });

  return ELEMENTS;
}

export function createViewHtml(data: Tag[]) {
  const TEXT_FOARM_CODE = createElement('div', ['text-foarm__code']);
  const STR_1_OPEN = createElement('p', ['code__tag'], 'open-1', '<div class="table">');
  const STR_1_CLOSED = createElement('p', ['code__tag'], 'closed-1', '</div>');

  TEXT_FOARM_CODE.append(STR_1_OPEN);
  TEXT_FOARM_CODE.append(...createLevelHtml(data, 30));
  TEXT_FOARM_CODE.append(STR_1_CLOSED);

  return TEXT_FOARM_CODE;
}
