import { Winner } from '../types/types';
import carSvg from './car-icon';
import { addAttribute } from './create-garage';
import { dataObj } from './data';
import { createElement } from './dom-utilites';
import { getCar } from './server-requests';

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
    const dataCar = getCar(data[i].id);

    if (dataCar) {
      dataCar.then((res) => {
        const tableData = [
          res?.id.toString(),
          res?.color,
          res?.name,
          data[i].wins.toString(),
          data[i].time.toString(),
        ] as string[];

        for (let j = 0; j < numberColumns; j += 1) {
          if (j === 1) {
            const TD = createElement('td');

            new Promise((resolve) => {
              TD.insertAdjacentHTML('beforeend', carSvg);
              resolve(addAttribute(TD, tableData[j]));
            }).then();

            TR.append(TD);
          } else {
            const TD = createElement('td', undefined, undefined, tableData[j]);
            TR.append(TD);
          }
        }
      });
    }

    TABLE.append(TR_HEADER, TR);
  }

  return TABLE;
}

export function createResultsPage(data: Winner[], page: number) {
  const PAGE_CONTAINER = createElement('div', ['page-container', 'page-container_height'], 'page-results');
  const PAGE_HEADER = createElement('h1', ['page__head'], undefined, `Winners (${dataObj.countWinnerCars})`);
  const PAGE_NUMBER = createElement('h3', ['page__number'], undefined, `Page #${page}`);
  const OLD_PAGE = document.body.querySelector('#page-results');

  OLD_PAGE?.remove();
  PAGE_CONTAINER.append(PAGE_HEADER, PAGE_NUMBER, createResultsTable(data));

  return PAGE_CONTAINER;
}
