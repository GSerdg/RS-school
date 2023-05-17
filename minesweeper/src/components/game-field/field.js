import './field.scss';
import createElement from '../../modules/createElement';
import { cellClick, getExclIndex, setFlag } from '../../modules/events';
import score from '../score-field/score';

const field = {
  FIELD_WRAPPER: createElement('div', ['field__wrapper']),
  GAME_FIELD: createElement('div', ['game-field']),
  TABLE: createElement('table', ['table']),
  TABLE_BODY: createElement('tbody', ['table_body']),
  createGameField(row, cell) {
    for (let i = 0; i < row; i += 1) {
      const tableRow = createElement('tr', ['table__row']);
      for (let j = 0; j < cell; j += 1) {
        const tableCell = createElement('td', ['table__cell']);
        const mineImg = createElement('img', ['table__cell__img', 'hidden']);
        mineImg.setAttribute('src', '/images/mine.png');
        tableCell.append(mineImg);
        tableRow.append(tableCell);
      }
      this.TABLE_BODY.append(tableRow);
    }
    this.TABLE.append(this.TABLE_BODY);
    this.GAME_FIELD.append(score.createScoreField());
    this.GAME_FIELD.append(this.TABLE);
    this.FIELD_WRAPPER.append(this.GAME_FIELD);

    this.TABLE.addEventListener('click', getExclIndex, { once: true });
    this.TABLE.addEventListener('click', cellClick);
    this.TABLE.addEventListener('contextmenu', setFlag);
    return this.FIELD_WRAPPER;
  },
};

export default field;
