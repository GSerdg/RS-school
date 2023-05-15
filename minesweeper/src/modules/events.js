import { feelMines, settings } from './feelMinesField';
// import field from '../components/game-field/field';

let fieldMatrix;
function getExclIndex(event) {
  const { target } = event;
  if (target.tagName !== 'TD') return;
  settings.cellExcl = target.cellIndex;
  settings.rowExcl = target.parentElement.rowIndex;
  fieldMatrix = feelMines(
    settings.row,
    settings.cell,
    settings.mine,
    settings.rowExcl,
    settings.cellExcl,
  );
}

function cellClick(event) {
  const { target } = event;
  const TABLE = target.closest('table');
  const TD = target.closest('td');
  if (!TD || Array.from(TD.classList).includes('table__cell_open')) return;
  const IMG = TD.firstElementChild;
  const cell = TD.cellIndex;
  const row = TD.parentElement.rowIndex;

  function openCells(i, j) {
    const elemTd = TABLE.rows[i].cells[j];
    const elemImg = elemTd.firstElementChild;
    elemTd.classList.add('table__cell_open');
    elemImg.classList.add('hidden');
    if (Number.isInteger(fieldMatrix[i][j]) && fieldMatrix[i][j] !== 0) {
      elemTd.innerText = fieldMatrix[i][j];
      elemTd.classList.add(`table__cell_color-${fieldMatrix[i][j]}`);
      return;
    }
    if (fieldMatrix[i][j] === 'mine') {
      elemImg.classList.remove('hidden');
      return;
    }
    if (fieldMatrix[i][j] === 0) {
      if (j > 0 && !Array.from(TABLE.rows[i].cells[j - 1].classList).includes('table__cell_open')) openCells(i, j - 1);
      if (j > 0 && i > 0 && !Array.from(TABLE.rows[i - 1].cells[j - 1].classList).includes('table__cell_open')) openCells(i - 1, j - 1);
      if (i > 0 && !Array.from(TABLE.rows[i - 1].cells[j].classList).includes('table__cell_open')) openCells(i - 1, j);
      if (i > 0 && j < settings.cell - 1 && !Array.from(TABLE.rows[i - 1].cells[j + 1].classList).includes('table__cell_open')) openCells(i - 1, j + 1);
      if (j < settings.cell - 1 && !Array.from(TABLE.rows[i].cells[j + 1].classList).includes('table__cell_open')) openCells(i, j + 1);
      if (i < settings.row - 1 && j < settings.cell - 1 && !Array.from(TABLE.rows[i + 1].cells[j + 1].classList).includes('table__cell_open')) openCells(i + 1, j + 1);
      if (i < settings.row - 1 && !Array.from(TABLE.rows[i + 1].cells[j].classList).includes('table__cell_open')) openCells(i + 1, j);
      if (j > 0 && i < settings.row - 1 && !Array.from(TABLE.rows[i + 1].cells[j - 1].classList).includes('table__cell_open')) openCells(i + 1, j - 1);
    }
  }

  if (IMG.classList.length === 2) {
    openCells(row, cell);
  }
}

function setFlag(event) {
  const { target } = event;
  const TD = target.closest('td');
  if (!TD || Array.from(TD.classList).includes('table__cell_open')) return;
  event.preventDefault();
  const IMG = TD.firstElementChild;
  if (IMG.classList.length === 2) {
    IMG.setAttribute('src', '/images/flag.png');
    IMG.classList.remove('hidden');
  } else {
    IMG.setAttribute('src', '/images/mine.png');
    IMG.classList.add('hidden');
  }
}

export { cellClick, getExclIndex, setFlag };
