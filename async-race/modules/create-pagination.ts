import createElement from './create-element';

export default function createPagination() {
  const PAGINATION = createElement('div', ['page__pagination']);
  const PREV_BUTTON = createElement('button', ['btn', 'btn_inactive'], undefined, 'PREV');
  const NEXT_BUTTON = createElement('button', ['btn', 'btn_inactive'], undefined, 'NEXT');

  PAGINATION.append(PREV_BUTTON, NEXT_BUTTON);

  return PAGINATION;
}
