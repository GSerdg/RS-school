import createPagination from './create-pagination';
import { replasePageResults } from './create_results';
import { BUTTON_TAG, resultObj, sortObj } from './data';
import { createElement, findDomElement } from './dom-utilites';

function gotoGarage(event: MouseEvent) {
  const target = event.target as HTMLButtonElement;
  if (target.tagName !== BUTTON_TAG) return;
  const RESULTS_PAGE = document.body.querySelector('.wrapper_absolute');
  if (!RESULTS_PAGE) return;

  const WRAPPER_RESULTS = findDomElement(document.body, '.wrapper_absolute');

  (document.body.firstElementChild as HTMLElement).classList.remove('wrapper_hidden');
  WRAPPER_RESULTS.remove();
  resultObj.page = 1;
  [sortObj.sortBy, sortObj.orderBy] = [undefined, undefined];
}

function gotoResults(event: MouseEvent) {
  const target = event.target as HTMLButtonElement;
  if (target.tagName !== BUTTON_TAG) return;
  const RESULTS_PAGE = document.body.querySelector('.wrapper_absolute');
  if (RESULTS_PAGE) return;

  const WRAPPER_RESULTS = createElement('div', ['wrapper', 'wrapper_absolute']);

  (document.body.firstElementChild as HTMLElement).classList.add('wrapper_hidden');
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  WRAPPER_RESULTS.append(createPageBtns());
  WRAPPER_RESULTS.append(createPagination('results'));
  document.body.append(WRAPPER_RESULTS);
  replasePageResults(resultObj.page);
}

export default function createPageBtns() {
  const GARAGE_BUTTON = createElement('button', ['btn', 'btn_color'], undefined, 'TO GARAGE');
  const WINNERS_BUTTON = createElement('button', ['btn', 'btn_color'], undefined, 'TO WINNERS');
  const ELEMENT = createElement('div', ['page-buttons']);

  ELEMENT.append(GARAGE_BUTTON, WINNERS_BUTTON);

  WINNERS_BUTTON.addEventListener('click', gotoResults);
  GARAGE_BUTTON.addEventListener('click', gotoGarage);

  return ELEMENT;
}
