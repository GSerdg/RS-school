import './field.scss';
import createElement from '../../modules/createElement';
import { cellClick, getExclIndex, changeTheme } from '../../modules/events';
import score from '../score-field/score';
import settings from '../../modules/settings';

const field = {
  createGameField(row, cell) {
    const FIELD_WRAPPER = createElement('div', ['field__wrapper']);
    const GAME_FIELD = createElement('div', ['game-field']);
    const TABLE = createElement('table', ['table']);
    const TABLE_BODY = createElement('tbody', ['table_body']);

    const SCORE_THEME = createElement('div', ['field__theme']);
    const THEME_TITLE = createElement('p', ['theme__title']);
    const theme = ['light', 'dark'];

    THEME_TITLE.innerText = 'Theme:';
    SCORE_THEME.append(THEME_TITLE);
    for (let i = 0; i < 2; i += 1) {
      const INPUT_THEME_CHECK = createElement('input', ['input__theme__check']);
      const INPUT_THEME_LABEL = createElement('label', ['input__theme__label']);
      INPUT_THEME_CHECK.setAttribute('type', 'radio');
      INPUT_THEME_CHECK.setAttribute('id', `theme${i + 1}`);
      INPUT_THEME_CHECK.setAttribute('name', 'theme');
      INPUT_THEME_CHECK.setAttribute('value', theme[i]);
      INPUT_THEME_LABEL.setAttribute('for', `theme${i + 1}`);
      INPUT_THEME_LABEL.innerText = theme[i];
      if ((settings.theme === 'light' && i === 0) || (settings.theme === 'dark' && i === 1)) INPUT_THEME_CHECK.setAttribute('checked', '');
      SCORE_THEME.append(INPUT_THEME_CHECK);
      SCORE_THEME.append(INPUT_THEME_LABEL);

      SCORE_THEME.addEventListener('change', changeTheme);
    }

    const width = window.innerWidth;
    let tableCell;
    for (let i = 0; i < row; i += 1) {
      const tableRow = createElement('tr', ['table__row']);
      for (let j = 0; j < cell; j += 1) {
        if (width <= 780 && row === 25) {
          tableCell = createElement('td', ['table__cell', 'table__cell_width']);
        } else {
          tableCell = createElement('td', ['table__cell']);
        }
        const mineImg = createElement('img', ['table__cell__img', 'hidden']);
        mineImg.setAttribute('src', './images/mine.png');
        tableCell.append(mineImg);
        tableRow.append(tableCell);
      }
      TABLE_BODY.append(tableRow);
    }
    TABLE.append(TABLE_BODY);

    GAME_FIELD.append(SCORE_THEME);
    GAME_FIELD.append(score.createScoreField());
    GAME_FIELD.append(TABLE);
    FIELD_WRAPPER.append(GAME_FIELD);

    TABLE.addEventListener('click', getExclIndex, { once: true });
    TABLE.addEventListener('click', cellClick);
    // TABLE.addEventListener('contextmenu', setFlag);
    return FIELD_WRAPPER;
  },
};

export default field;
