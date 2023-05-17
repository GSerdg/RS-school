import './score.scss';
import createElement from '../../modules/createElement';
import settings from '../../modules/settings';

const score = {
  SCORE: createElement('div', ['score']),
  SCORE_TIMER: createElement('div', ['score__timer']),
  SCORE_COUNT: createElement('div', ['score__count']),

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
    this.SCORE.append(this.SCORE_COUNT);
    this.SCORE.append(this.SCORE_TIMER);
    return this.SCORE;
  },
};

export default score;
