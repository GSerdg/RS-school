import './field.scss';
import createElement from '../../modules/createElement';
import { cellClick, getExclIndex } from '../../modules/events';

const field = {
  FIELD_WRAPPER: createElement('div', ['field__wrapper']),
  TABLE: createElement('table', ['table']),
  TABLE_BODY: createElement('tbody', ['table_body']),
  createGameField(row, cell) {
    for (let i = 0; i < row; i += 1) {
      const tableRow = createElement('tr', ['table__row']);
      for (let j = 0; j < cell; j += 1) {
        const tableCell = createElement('td', ['table__cell']);
        tableCell.innerText = '2';
        tableRow.append(tableCell);
      }
      this.TABLE_BODY.append(tableRow);
    }
    this.TABLE.append(this.TABLE_BODY);
    this.FIELD_WRAPPER.append(this.TABLE);

    this.TABLE.addEventListener('click', getExclIndex, { once: true });
    this.TABLE.addEventListener('click', cellClick);
    return this.FIELD_WRAPPER;
  },
};

export default field;
