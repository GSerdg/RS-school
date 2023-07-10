import createGarage from './create-garage';
import { CARS_ON_PAGE, dataObj } from './data';
import findDomElement from './find-dom-element';
import getCars from './get-cars';

export function changePaginationStatus(prev?: HTMLElement, next?: HTMLElement) {
  const PREV_BUTTON = prev || findDomElement(document.body, '#prev-btn');
  const NEXT_BUTTON = next || findDomElement(document.body, '#next-btn');
  const FIRST_PAGE = 1;

  if (dataObj.page === FIRST_PAGE) {
    PREV_BUTTON.classList.add('btn_inactive');
  } else {
    PREV_BUTTON.classList.remove('btn_inactive');
  }
  if (CARS_ON_PAGE * dataObj.page >= dataObj.countGarageCars) {
    NEXT_BUTTON.classList.add('btn_inactive');
  } else {
    NEXT_BUTTON.classList.remove('btn_inactive');
  }
}

export async function replasePage(page: number) {
  const getCarsData = await getCars();
  const PAGE_CONTAINER = findDomElement(document.body, '.page-container');
  PAGE_CONTAINER.replaceWith(createGarage(getCarsData, page));
  changePaginationStatus();
}
