import './main.scss';
import createElement from '../../modules/createElement';
import field from '../game-field/field';
import settings from '../../modules/settings';
import { cellClick, setFlag } from '../../modules/events';
import score from '../score-field/score';

function createMainWindow() {
  const MAIN = createElement('main', ['main']);
  const FIELD = createElement('div', ['field']);
  const WRAPPER = createElement('div', ['wrapper']);

  if (localStorage.getItem('save')) {
    // Если был reload во время игры
    const saveSettings = JSON.parse(localStorage.settings);
    const saveSettingsKeys = Object.keys(saveSettings);
    saveSettingsKeys.forEach((key) => {
      settings[key] = saveSettings[key];
    });
    WRAPPER.innerHTML = localStorage.getItem('table');
    const TABLE_SAVE = WRAPPER.querySelector('.table');
    const SCORE_TIMER_SAVE = WRAPPER.querySelector('.score__timer');
    TABLE_SAVE.addEventListener('click', cellClick);
    TABLE_SAVE.addEventListener('contextmenu', setFlag);
    settings.timerId = setInterval(() => {
      settings.timer += 1;
      SCORE_TIMER_SAVE.innerText = score.convertCount(settings.timer);
    }, 1000);
  } else {
    WRAPPER.append(field.createGameField(settings.cell, settings.row));
  }
  FIELD.append(WRAPPER);
  MAIN.append(FIELD);

  return MAIN;
}

export default createMainWindow;
