import { dataObj } from './data';
import { findDomElement } from './dom-utilites';

export default function changePaginationStatus(prev?: HTMLElement, next?: HTMLElement) {
  const PREV_BUTTON = prev || findDomElement(document.body, '#prev-btn');
  const NEXT_BUTTON = next || findDomElement(document.body, '#next-btn');
  const FIRST_PAGE = 1;

  if (dataObj.page === FIRST_PAGE) {
    PREV_BUTTON.classList.add('btn_inactive');
  } else {
    PREV_BUTTON.classList.remove('btn_inactive');
  }
  if (dataObj.limit * dataObj.page >= dataObj.countGarageCars) {
    NEXT_BUTTON.classList.add('btn_inactive');
  } else {
    NEXT_BUTTON.classList.remove('btn_inactive');
  }
}
