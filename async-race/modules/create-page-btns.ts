import { createResultsPage } from './create_results';
import { resultObj } from './data';
import { createElement, findDomElement } from './dom-utilites';
import { getResults } from './server-requests';

export default function createPageBtns() {
  const GARAGE_BUTTON = createElement('button', ['btn', 'btn_color'], undefined, 'TO GARAGE');
  const WINNERS_BUTTON = createElement('button', ['btn', 'btn_color'], undefined, 'TO WINNERS');
  const ELEMENT = createElement('div', ['page-buttons']);

  ELEMENT.append(GARAGE_BUTTON, WINNERS_BUTTON);

  GARAGE_BUTTON.addEventListener('click', () => {
    (document.body.firstElementChild as HTMLElement).classList.remove('wrapper_hidden');
    (document.body.lastElementChild as HTMLElement).classList.add('wrapper_hidden');
  });

  WINNERS_BUTTON.addEventListener('click', async () => {
    (document.body.firstElementChild as HTMLElement).classList.add('wrapper_hidden');
    (document.body.lastElementChild as HTMLElement).classList.remove('wrapper_hidden');

    const WRAPPER_RESULTS = findDomElement(document.body, '.wrapper_absolute');
    const dataWinner = await getResults(resultObj.page, resultObj.limit);

    if (dataWinner) {
      WRAPPER_RESULTS.firstElementChild?.after(createResultsPage(dataWinner, resultObj.page));
    }
  });

  return ELEMENT;
}
