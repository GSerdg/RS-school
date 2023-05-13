import './field.scss';
import createElement from '../../modules/createElement';

function createGameField(row, cell) {
  const FIELD_WRAPPER = createElement('div', ['field__wrapper']);
  const TABLE = createElement('table', ['table']);
  const TABLE_BODY = createElement('tbody', ['table_body']);

  for (let i = 0; i < row; i += 1) {
    const tableRow = createElement('tr', ['table__row']);
    for (let j = 0; j < cell; j += 1) {
      const tableCell = createElement('td', ['table__cell']);
      tableRow.append(tableCell);
    }
    TABLE_BODY.append(tableRow);
  }
  TABLE.append(TABLE_BODY);
  FIELD_WRAPPER.append(TABLE);

  TABLE.addEventListener('click', (event) => {
    const { target } = event;
    if (target.tagName !== 'TD') return;
    target.classList.add('table__cell_shadow');
  });
  return {
    FIELD_WRAPPER,
    TABLE_BODY,
  };
}

export default createGameField;
