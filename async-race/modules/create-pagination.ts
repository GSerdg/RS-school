import { changePaginationGarageStatus, changePaginationResultStatus } from './app-utilites';
import { replasePageGarage } from './create-garage';
import { replasePageResults } from './create_results';
import { BUTTON_TAG, carReturn, dataObj, resultObj } from './data';
import { createElement } from './dom-utilites';

function turnPageGarage(event: MouseEvent) {
  const target = event.target as HTMLButtonElement;
  if (target.tagName !== BUTTON_TAG) return;

  const ID_PREV = 'prev-btn';
  const ID_NEXT = 'next-btn';
  const FIRST_PAGE = 1;

  if (target.id === ID_NEXT && dataObj.limit * dataObj.page < dataObj.countGarageCars) {
    dataObj.page += 1;
    replasePageGarage(dataObj.page);
  }
  if (target.id === ID_PREV && dataObj.page !== FIRST_PAGE) {
    dataObj.page -= 1;
    replasePageGarage(dataObj.page);
  }
  carReturn.clear();
}

function turnPageResults(event: MouseEvent) {
  const target = event.target as HTMLButtonElement;
  if (target.tagName !== BUTTON_TAG) return;

  const ID_PREV = 'prev-btn';
  const ID_NEXT = 'next-btn';
  const FIRST_PAGE = 1;

  if (target.id === ID_NEXT && resultObj.limit * resultObj.page < resultObj.countWinnerCars) {
    resultObj.page += 1;
    replasePageResults(resultObj.page);
  }
  if (target.id === ID_PREV && resultObj.page !== FIRST_PAGE) {
    resultObj.page -= 1;
    replasePageResults(resultObj.page);
  }
}

export default function createPagination(page: 'garage' | 'results') {
  const PAGINATION = createElement('div', ['page__pagination']);
  const PREV_BUTTON = createElement('button', ['btn', 'btn_color'], 'prev-btn', 'PREV');
  const NEXT_BUTTON = createElement('button', ['btn', 'btn_color'], 'next-btn', 'NEXT');

  PAGINATION.append(PREV_BUTTON, NEXT_BUTTON);

  if (page === 'garage') {
    changePaginationGarageStatus(PREV_BUTTON, NEXT_BUTTON);
    PAGINATION.addEventListener('click', turnPageGarage);
  }
  if (page === 'results') {
    changePaginationResultStatus(PREV_BUTTON, NEXT_BUTTON);
    PAGINATION.addEventListener('click', turnPageResults);
  }

  return PAGINATION;
}
