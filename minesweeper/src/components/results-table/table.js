import './table.scss';
import createElement from '../../modules/createElement';
import { cellClick, getExclIndex, setFlag } from '../../modules/events';
import settings from '../../modules/settings';

function createResultsTable(results) {
  const header = ['Level', 'Number of\nmines', 'Time', 'Number of\nsteps'];
  const RESULTS = createElement('div', ['results']);
  const TITLE = createElement('p', ['results__title']);
  const TABLE = createElement('table', ['results__table']);
  const TABLE_BTN = createElement('div', ['menu__btn']);

  TABLE_BTN.innerText = 'OK';

  if (results.length === 0) {
    TITLE.innerText = "You don't have any results yet";
    RESULTS.append(TITLE);
  } else {
    TITLE.innerText = 'Your results';
    for (let i = results.length; i >= 0; i -= 1) {
      const tableRow = createElement('tr', ['results__row']);
      for (let j = 0; j < 4; j += 1) {
        if (i === results.length) {
          const tableCell = createElement('th', ['results__cell']);
          tableCell.innerText = header[j];
          tableRow.append(tableCell);
        } else {
          const tableCell = createElement('td', ['results__cell']);
          tableCell.innerText = results[i][j];
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
    if (localStorage.getItem('startGame') !== 'finish') {
      table.addEventListener('click', getExclIndex, { once: true });
      table.addEventListener('click', cellClick);
    }
    if (localStorage.getItem('startGame') === 'game') {
      table.addEventListener('contextmenu', setFlag);
    }

    RESULTS.remove();
  });

  if (settings.theme === 'dark') {
    RESULTS.classList.add('results_theme');
    RESULTS.querySelectorAll('.results__cell').forEach((elem) => {
      elem.classList.add('results__cell_theme');
    });
    TABLE.classList.add('results__table_theme');
    TABLE_BTN.classList.add('menu__btn_theme');
  }

  return RESULTS;
}

export default createResultsTable;
