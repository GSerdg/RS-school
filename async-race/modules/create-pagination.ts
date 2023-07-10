import createElement from './create-element';
import { BUTTON_TAG, CARS_ON_PAGE, dataObj } from './data';
import { changePaginationStatus, replasePage } from './utilites';

function turnPage(event: MouseEvent) {
  const target = event.target as HTMLButtonElement;
  if (target.tagName !== BUTTON_TAG) return;

  const ID_PREV = 'prev-btn';
  const ID_NEXT = 'next-btn';
  const FIRST_PAGE = 1;

  if (target.id === ID_NEXT && CARS_ON_PAGE * dataObj.page < dataObj.countGarageCars) {
    dataObj.page += 1;
    replasePage(dataObj.page);
  }
  if (target.id === ID_PREV && dataObj.page !== FIRST_PAGE) {
    dataObj.page -= 1;
    replasePage(dataObj.page);
  }
}

export default function createPagination() {
  const PAGINATION = createElement('div', ['page__pagination']);
  const PREV_BUTTON = createElement('button', ['btn', 'btn_color'], 'prev-btn', 'PREV');
  const NEXT_BUTTON = createElement('button', ['btn', 'btn_color'], 'next-btn', 'NEXT');

  PAGINATION.append(PREV_BUTTON, NEXT_BUTTON);
  changePaginationStatus(PREV_BUTTON, NEXT_BUTTON);
  PAGINATION.addEventListener('click', turnPage);

  return PAGINATION;
}
