import '../#source/scss/base/_base.scss';
import createElement from './modules/createElement';
import createHeader from './components/header/header';
import createMainWindow from './components/main/main';
import saveGame from './modules/save';
import score from './components/score-field/score';
import settings from './modules/settings';
import { cellClick, setFlag } from './modules/events';

function StartNewGame() {
  const radio = Array.from(document.body.querySelectorAll('.input__width__check'));
  for (let i = 0; i < 3; i += 1) {
    if (radio[i].checked) {
      switch (radio[i].value) {
        case 'small':
          settings.cell = 10;
          settings.row = 10;
          break;
        case 'medium':
          settings.cell = 15;
          settings.row = 15;
          break;
        case 'hard':
          settings.cell = 25;
          settings.row = 25;
          break;
        default:
          break;
      }
      break;
    }
  }
  settings.mine = document.body.querySelector('.mines__range').value;
  localStorage.clear();
  clearInterval(settings.timerId);
  settings.timer = 0;
  settings.stepCount = 0;
  document.body.querySelector('.main').remove();
  document.body.append(createMainWindow());
  saveGame();
}

document.body.append(createHeader());
saveGame();
// console.log(score.BTN_START);
score.BTN_START.addEventListener('click', StartNewGame);

if (localStorage.getItem('save') && localStorage.getItem('startGame')) {
  // Если был reload во время игры
  const MAIN = createElement('main', ['main']);
  document.body.append(MAIN);
  const saveSettings = JSON.parse(localStorage.settings);
  const saveSettingsKeys = Object.keys(saveSettings);
  saveSettingsKeys.forEach((key) => {
    settings[key] = saveSettings[key];
  });
  MAIN.innerHTML = localStorage.getItem('main');
  const TABLE_SAVE = MAIN.querySelector('.table');
  const SCORE_TIMER_SAVE = MAIN.querySelector('.score__timer');
  const NEW_GAME_BTN = MAIN.querySelectorAll('.menu__btn')[0];

  TABLE_SAVE.addEventListener('click', cellClick);
  TABLE_SAVE.addEventListener('contextmenu', setFlag);
  NEW_GAME_BTN.addEventListener('click', () => {
    NEW_GAME_BTN.after(score.createSettingsMenu());
  });

  settings.timerId = setInterval(() => {
    settings.timer += 1;
    SCORE_TIMER_SAVE.innerText = score.convertCount(settings.timer);
  }, 1000);
} else {
  document.body.append(createMainWindow());
}
