import { feelMines, settings } from './feelMinesField';

let fieldMatrix;
function getExclIndex(event) {
  const { target } = event;
  if (target.tagName !== 'TD') return;
  settings.cellExcl = target.cellIndex;
  settings.rowExcl = target.parentElement.rowIndex;
  fieldMatrix = feelMines(settings.row, settings.cell, settings.mine, settings.rowExcl, settings.cellExcl);
}

function cellClick(event) {
  const { target } = event;
  const TD = target.closest('td');
  if (!TD || Array.from(TD.classList).includes('table__cell_open')) return;
  const IMG = TD.firstElementChild;
  const j = TD.cellIndex;
  const i = TD.parentElement.rowIndex;
  if (IMG.classList.length === 2) {
    TD.classList.add('table__cell_open');
    if (Number.isInteger(fieldMatrix[i][j]) && fieldMatrix[i][j] !== 0) {
      TD.innerText = fieldMatrix[i][j];
      TD.classList.add(`table__cell_color-${fieldMatrix[i][j]}`);
    } else if (fieldMatrix[i][j] === 'mine') {
      IMG.classList.remove('hidden');
    }
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
