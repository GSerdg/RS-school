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
    const FIELD_WRAPPER = createElement('div', ['field__wrapper']);
    const GAME_FIELD = createElement('div', ['game-field']);
    const TABLE = createElement('table', ['table']);
    const TABLE_BODY = createElement('tbody', ['table_body']);
    for (let i = 0; i < row; i += 1) {
      const tableRow = createElement('tr', ['table__row']);
      for (let j = 0; j < cell; j += 1) {
        const tableCell = createElement('td', ['table__cell']);
        const mineImg = createElement('img', ['table__cell__img', 'hidden']);
        mineImg.setAttribute('src', '/images/mine.png');
        tableCell.append(mineImg);
        tableRow.append(tableCell);
      }
      TABLE_BODY.append(tableRow);
    }
    TABLE.append(TABLE_BODY);
    GAME_FIELD.append(score.createScoreField());
    GAME_FIELD.append(TABLE);
    FIELD_WRAPPER.append(GAME_FIELD);

    TABLE.addEventListener('click', getExclIndex, { once: true });
    TABLE.addEventListener('click', cellClick);
    TABLE.addEventListener('contextmenu', setFlag);
    return FIELD_WRAPPER;
  },
};

export default field;
