import './field.scss';
import createElement from '../../modules/createElement';
import { cellClick, getExclIndex, setFlag } from '../../modules/events';

const field = {
  FIELD_WRAPPER: createElement('div', ['field__wrapper']),
  TABLE: createElement('table', ['table']),
  TABLE_BODY: createElement('tbody', ['table_body']),
  createGameField(row, cell) {
    for (let i = 0; i < row; i += 1) {
      const tableRow = createElement('tr', ['table__row']);
      for (let j = 0; j < cell; j += 1) {
        const tableCell = createElement('td', ['table__cell']);
        const mineImg = createElement('img', ['table__cell__img', 'hidden']);
        mineImg.setAttribute('src', '/images/mine.png');
        // tableCell.innerText = '2';
        tableCell.append(mineImg);
        tableRow.append(tableCell);
      }
      this.TABLE_BODY.append(tableRow);
    }
    this.TABLE.append(this.TABLE_BODY);
    this.FIELD_WRAPPER.append(this.TABLE);

    this.TABLE.addEventListener('click', getExclIndex, { once: true });
    this.TABLE.addEventListener('click', cellClick);
    this.TABLE.addEventListener('contextmenu', setFlag);
    return this.FIELD_WRAPPER;
  },
};

export default field;
