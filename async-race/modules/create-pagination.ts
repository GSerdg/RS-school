import createElement from './create-element';
import { BUTTON_TAG, dataObj } from './data';
import replasePage from './utilites';

function turnPage(event: MouseEvent) {
  const target = event.target as HTMLButtonElement;
  if (target.tagName !== BUTTON_TAG) return;

  const ID_PREV = 'prev-btn';
  const ID_NEXT = 'next-btn';

  if (target.id === ID_NEXT) {
    dataObj.page += 1;
    replasePage(dataObj.page);
  }
  if (target.id === ID_PREV) {
    dataObj.page -= 1;
    replasePage(dataObj.page);
  }
}

export default function createPagination() {
  const PAGINATION = createElement('div', ['page__pagination']);
  const PREV_BUTTON = createElement('button', ['btn', 'btn_inactive'], 'prev-btn', 'PREV');
  const NEXT_BUTTON = createElement('button', ['btn', 'btn_inactive'], 'next-btn', 'NEXT');

  PAGINATION.append(PREV_BUTTON, NEXT_BUTTON);

  PAGINATION.addEventListener('click', turnPage);

  return PAGINATION;
}
