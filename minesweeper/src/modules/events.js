import { feelMines, settings } from './feelMinesField';

function getExclIndex(event) {
  const { target } = event;
  if (target.tagName !== 'TD') return;
  settings.cellExcl = target.cellIndex;
  settings.rowExcl = target.parentElement.rowIndex;
  feelMines(settings.row, settings.cell, settings.mine, settings.rowExcl, settings.cellExcl);
}

function cellClick(event) {
  const { target } = event;
  if (target.tagName !== 'TD') return;
  target.classList.add('table__cell_shadow');
}

export { cellClick, getExclIndex };
