import './score.scss';
import createElement from '../../modules/createElement';
import settings from '../../modules/settings';

const score = {
  BTN_START: createElement('div', ['menu__btn', 'menu__btn_start']),

  // Конвертирует число n в формат '00n'
  convertCount(count) {
    const len = String(count).length;
    if (len === 1) return `00${count}`;
    if (len === 2) return `0${count}`;
    return `${count}`;
  },

  createScoreField() {
    const SCORE = createElement('div', ['score']);
    const SCORE_TIMER = createElement('div', ['score__timer']);
    const SCORE_COUNT = createElement('div', ['score__count']);
    const SCORE_MENU = createElement('div', ['score__menu']);
    const BTN_NEW = createElement('div', ['menu__btn']);
    const BTN_RESULTS = createElement('div', ['menu__btn']);

    SCORE_TIMER.innerText = this.convertCount(settings.timer);
    SCORE_COUNT.innerText = this.convertCount(settings.stepCount);
    BTN_NEW.innerText = 'New Game';
    BTN_RESULTS.innerText = 'results';
    SCORE.append(SCORE_COUNT);
    SCORE_MENU.append(BTN_NEW);
    SCORE_MENU.append(BTN_RESULTS);
    SCORE.append(SCORE_MENU);
    SCORE.append(SCORE_TIMER);

    BTN_NEW.addEventListener('click', () => {
      SCORE_MENU.append(this.createSettingsMenu());
    });

    return SCORE;
  },
  createSettingsMenu() {
    const NEW_INPUT = createElement('div', ['new__input']);
    const INPUT_WIDTH = createElement('div', ['input__width']);
    const width = ['small', 'medium', 'hard'];
    const INPUT_MINES = createElement('div', ['input__mines']);
    const MINES_RANGE = createElement('input', ['mines__range']);
    const MINES_RANGE_VALUE = createElement('span', ['mines__range__value']);
    for (let i = 0; i < 3; i += 1) {
      const INPUT_WIDTH_CHECK = createElement('input', ['input__width__check']);
      const INPUT_WIDTH_LABEL = createElement('label', ['input__width__label']);
      INPUT_WIDTH_CHECK.setAttribute('type', 'radio');
      INPUT_WIDTH_CHECK.setAttribute('id', `width${i + 1}`);
      INPUT_WIDTH_CHECK.setAttribute('name', 'width');
      INPUT_WIDTH_CHECK.setAttribute('value', width[i]);
      INPUT_WIDTH_LABEL.setAttribute('for', `width${i + 1}`);
      INPUT_WIDTH_LABEL.innerText = width[i];
      if (i === 0) INPUT_WIDTH_CHECK.setAttribute('checked', '');

      INPUT_WIDTH.append(INPUT_WIDTH_CHECK);
      INPUT_WIDTH.append(INPUT_WIDTH_LABEL);
    }
    MINES_RANGE.setAttribute('type', 'range');
    MINES_RANGE.setAttribute('min', '10');
    MINES_RANGE.setAttribute('max', '99');
    MINES_RANGE.setAttribute('oninput', "document.querySelector('.mines__range__value').innerHTML = value + ' mines';");
    MINES_RANGE.setAttribute('value', '10');
    MINES_RANGE_VALUE.innerText = '10 mines';
    INPUT_MINES.append(MINES_RANGE);
    INPUT_MINES.append(MINES_RANGE_VALUE);
    NEW_INPUT.append(INPUT_WIDTH);
    NEW_INPUT.append(INPUT_MINES);
    this.BTN_START.innerText = 'Start Game';
    NEW_INPUT.append(this.BTN_START);

    return NEW_INPUT;
  },
};

export default score;
