import './table.scss';
import createElement from '../../modules/createElement';
import { cellClick, getExclIndex, setFlag } from '../../modules/events';

// import settings from '../../modules/settings';

function createResultsTable(results) {
  const header = ['Level', 'Number of\nmines', 'Time', 'Number of\nsteps'];
  const RESULTS = createElement('div', ['results']);
  const TITLE = createElement('p', ['results__title']);
  const TABLE = createElement('table', ['results__table']);
  // const TABLE_BODY = createElement('tbody', []);
  const TABLE_BTN = createElement('div', ['menu__btn']);

  TABLE_BTN.innerText = 'OK';

  if (results.length === 0) {
    TITLE.innerText = "You don't have any results yet";
    RESULTS.append(TITLE);
  } else {
    TITLE.innerText = 'Your results';
    for (let i = 0; i < results.length + 1; i += 1) {
      const tableRow = createElement('tr', ['results__row']);
      for (let j = 0; j < 4; j += 1) {
        if (i === 0) {
          const tableCell = createElement('th', ['results__cell']);
          tableCell.innerText = header[j];
          tableRow.append(tableCell);
        } else {
          const tableCell = createElement('td', ['results__cell']);
          tableCell.innerText = results[i - 1][j];
          tableRow.append(tableCell);
        }
      }
      TABLE.append(tableRow);
    }
    RESULTS.append(TITLE);
    RESULTS.append(TABLE);
  }
  RESULTS.append(TABLE_BTN);

  TABLE_BTN.addEventListener('click', () => {
    const table = document.body.querySelector('.table');

    RESULTS.remove();
    table.addEventListener('click', getExclIndex, { once: true });
    table.addEventListener('click', cellClick);
    table.addEventListener('contextmenu', setFlag);
  });

  return RESULTS;
}

export default createResultsTable;
