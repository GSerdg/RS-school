import './score.scss';
import createElement from '../../modules/createElement';
import settings from '../../modules/settings';

const score = {
  SCORE: createElement('div', ['score']),
  SCORE_TIMER: createElement('div', ['score__timer']),
  SCORE_COUNT: createElement('div', ['score__count']),
  SCORE_MENU: createElement('div', ['score__menu']),
  BTN_NEW: createElement('div', ['menu__btn']),
  BTN_RESULTS: createElement('div', ['menu__btn']),
  BTN_START: createElement('div', ['menu__btn', 'menu__btn_start']),

  NEW_INPUT: createElement('div', ['new__input']),
  INPUT_WIDTH: createElement('div', ['input__width']),
  width: ['small', 'medium', 'hard'],
  INPUT_MINES: createElement('div', ['input__mines']),
  MINES_RANGE: createElement('input', ['mines__range']),
  MINES_RANGE_VALUE: createElement('span', ['mines__range__value']),

  // INPUT_WIDTH_CHECK: createElement('div', ['new__input']),
  // Конвертирует число n в формат '00n'
  convertCount(count) {
    const len = String(count).length;
    if (len === 1) return `00${count}`;
    if (len === 2) return `0${count}`;
    return `${count}`;
  },

  createScoreField() {
    this.SCORE_TIMER.innerText = this.convertCount(settings.timer);
    this.SCORE_COUNT.innerText = this.convertCount(settings.stepCount);
    this.BTN_NEW.innerText = 'New Game';
    this.BTN_RESULTS.innerText = 'results';
    this.SCORE.append(this.SCORE_COUNT);
    this.SCORE_MENU.append(this.BTN_NEW);
    this.SCORE_MENU.append(this.BTN_RESULTS);
    this.SCORE.append(this.SCORE_MENU);
    this.SCORE.append(this.SCORE_TIMER);

    this.BTN_NEW.addEventListener('click', () => {
      this.SCORE_MENU.append(this.createSettingsMenu());
    });

    return this.SCORE;
  },
  createSettingsMenu() {
    for (let i = 0; i < 3; i += 1) {
      const INPUT_WIDTH_CHECK = createElement('input', ['input__width__check']);
      const INPUT_WIDTH_LABEL = createElement('label', ['input__width__label']);
      INPUT_WIDTH_CHECK.setAttribute('type', 'radio');
      INPUT_WIDTH_CHECK.setAttribute('id', `width${i + 1}`);
      INPUT_WIDTH_CHECK.setAttribute('name', 'width');
      INPUT_WIDTH_CHECK.setAttribute('value', this.width[i]);
      INPUT_WIDTH_LABEL.setAttribute('for', `width${i + 1}`);
      INPUT_WIDTH_LABEL.innerText = this.width[i];
      if (i === 0) INPUT_WIDTH_CHECK.setAttribute('checked', '');

      this.INPUT_WIDTH.append(INPUT_WIDTH_CHECK);
      this.INPUT_WIDTH.append(INPUT_WIDTH_LABEL);
    }
    this.MINES_RANGE.setAttribute('type', 'range');
    this.MINES_RANGE.setAttribute('min', '10');
    this.MINES_RANGE.setAttribute('max', '99');
    this.MINES_RANGE.setAttribute('onchange', "document.querySelector('.mines__range__value').innerHTML = this.value + ' mines';");
    this.MINES_RANGE_VALUE.innerText = '10 mines';
    this.INPUT_MINES.append(this.MINES_RANGE);
    this.INPUT_MINES.append(this.MINES_RANGE_VALUE);
    this.NEW_INPUT.append(this.INPUT_WIDTH);
    this.NEW_INPUT.append(this.INPUT_MINES);
    this.BTN_START.innerText = 'Start Game';
    this.NEW_INPUT.append(this.BTN_START);
    return this.NEW_INPUT;
  },
};

export default score;
