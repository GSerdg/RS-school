import { Winner } from '../types/types';
import { dataObj } from './data';
import { createElement } from './dom-utilites';

export function createResultsTable(data: Winner[]) {
  const headers = ['Number', 'Car', 'Name', 'Wins', 'Best time(s)'];
  const numberColumns = 5;
  const TABLE = createElement('table', ['results-table']);
  const TR_HEADER = createElement('tr', ['table__head']);

  for (let k = 0; k < numberColumns; k += 1) {
    const TH = createElement('th', undefined, undefined, headers[k]);
    TR_HEADER.append(TH);
  }

  for (let i = 0; i < data.length; i += 1) {
    const TR = createElement('tr');

    for (let j = 0; j < numberColumns; j += 1) {
      const TD = createElement('td', undefined, undefined, 'example');
      TR.append(TD);
    }

    TABLE.append(TR_HEADER, TR);
  }

  return TABLE;
}

export function createResultsPage(data: Winner[], page: number) {
  const PAGE_CONTAINER = createElement('div', ['page-container']);
  const PAGE_HEADER = createElement('h1', ['page__head'], undefined, `Garage(${dataObj.countGarageCars})`);
  const PAGE_NUMBER = createElement('h3', ['page__number'], undefined, `Page #${page}`);

  PAGE_CONTAINER.append(PAGE_HEADER, PAGE_NUMBER, createResultsTable(data));

  return PAGE_CONTAINER;
}
