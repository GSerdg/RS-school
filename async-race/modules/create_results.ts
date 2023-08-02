import { OrderBy, SortBy, Winner } from '../types/types';
import { changePaginationResultStatus } from './app-utilites';
import carSvg from './car-icon';
import { addAttribute } from './create-garage';
import { resultObj, sortObj } from './data';
import { createElement, findDomElement } from './dom-utilites';
import { getCar, getResults } from './api';

async function addTableClass(sort: SortBy, order: OrderBy, className: string) {
  const TH_ID = {
    id: '#head-0',
    wins: '#head-3',
    time: '#head-4',
  };
  [sortObj.sortBy, sortObj.orderBy] = [sort, order];
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  await replasePageResults(resultObj.page, sortObj.sortBy, sortObj.orderBy);

  const TH = findDomElement(document.body, TH_ID[sort]);
  TH.classList.add(className);
}

function sortResultsEvent(event: MouseEvent) {
  const [NUMBER_ID, WINS_ID, TIME_ID] = ['head-0', 'head-3', 'head-4'];
  const target = event.target as HTMLElement;
  if (target.id !== NUMBER_ID && target.id !== WINS_ID && target.id !== TIME_ID) return;

  switch (target.id) {
    case NUMBER_ID:
      if (target.classList.contains('sort-up')) {
        addTableClass('id', 'DESC', 'sort-down');
      } else {
        addTableClass('id', 'ASC', 'sort-up');
      }
      break;
    case WINS_ID:
      if (target.classList.contains('sort-up')) {
        addTableClass('wins', 'DESC', 'sort-down');
      } else {
        addTableClass('wins', 'ASC', 'sort-up');
      }
      break;
    case TIME_ID:
      if (target.classList.contains('sort-up')) {
        addTableClass('time', 'DESC', 'sort-down');
      } else {
        addTableClass('time', 'ASC', 'sort-up');
      }
      break;

    default:
      break;
  }
}

export function createResultsTable(data: Winner[]) {
  const headers = ['Number', 'Car', 'Name', 'Wins', 'Best time(s)'];
  const headThClass = [['head__td'], undefined, undefined, ['head__td'], ['head__td']];
  const numberColumns = 5;
  const TABLE = createElement('table', ['results-table']);
  const TR_HEADER = createElement('tr', ['table__head']);

  for (let k = 0; k < numberColumns; k += 1) {
    const TH = createElement('th', headThClass[k], `head-${k}`, headers[k]);
    TR_HEADER.append(TH);
  }

  TABLE.append(TR_HEADER);

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

    TABLE.append(TR);
    TR_HEADER.addEventListener('click', sortResultsEvent);
  }
  return TABLE;
}

export function createResultsPage(data: Winner[], page: number) {
  const PAGE_CONTAINER = createElement('div', ['page-container', 'page-container_height'], 'page-results');
  const PAGE_HEADER = createElement('h1', ['page__head'], undefined, `Winners (${resultObj.count})`);
  const PAGE_NUMBER = createElement('h3', ['page__number'], undefined, `Page #${page}`);
  PAGE_CONTAINER.append(PAGE_HEADER, PAGE_NUMBER, createResultsTable(data));

  return PAGE_CONTAINER;
}

export async function replasePageResults(page: number, sort?: SortBy, order?: OrderBy) {
  const WRAPPER_RESULTS = findDomElement(document.body, '.wrapper_absolute');
  const PREV_BUTTON = WRAPPER_RESULTS.lastElementChild?.firstElementChild as HTMLButtonElement;
  const NEXT_BUTTON = WRAPPER_RESULTS.lastElementChild?.lastElementChild as HTMLButtonElement;
  const OLD_PAGE = document.body.querySelector('#page-results');
  const dataWinner = await getResults(page, resultObj.limit, sort, order);

  if (dataWinner) {
    OLD_PAGE?.remove();
    WRAPPER_RESULTS.firstElementChild?.after(createResultsPage(dataWinner, page));
  }

  changePaginationResultStatus(PREV_BUTTON, NEXT_BUTTON);
}
