import '../#source/scss/base/_base.scss';
import createElement from './modules/createElement';
import createHeader from './components/header/header';
import createMainWindow from './components/main/main';
import saveGame from './modules/save';
import score from './components/score-field/score';
import settings from './modules/settings';
import { cellClick, getExclIndex, setFlag } from './modules/events';

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
// Управляет слушателями для открытия и закрытия окна настроек
function settingsMenu() {
  const TABLE = document.body.querySelector('.table');
  const ELEM = document.body.querySelector('.score__menu');

  function closeSettingsMenu(event) {
    const { target } = event;
    const MENU = target.closest('.new__input');
    if (MENU || target.classList[0] === 'menu__btn') return;
    ELEM.lastChild.remove();
    document.removeEventListener('click', closeSettingsMenu);
    TABLE.addEventListener('click', getExclIndex, { once: true });
    TABLE.addEventListener('click', cellClick);
    TABLE.addEventListener('contextmenu', setFlag);
    localStorage.setItem('startGame', true);
  }

  ELEM.append(score.createSettingsMenu());
  TABLE.removeEventListener('click', cellClick);
  TABLE.removeEventListener('contextmenu', setFlag);
  TABLE.removeEventListener('click', getExclIndex);
  localStorage.removeItem('startGame');
  document.addEventListener('click', closeSettingsMenu);
}

document.body.append(createHeader());
saveGame();
score.BTN_START.addEventListener('click', StartNewGame);
score.BTN_NEW.addEventListener('click', settingsMenu);

if (localStorage.getItem('startGame')) {
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
  NEW_GAME_BTN.addEventListener('click', settingsMenu);

  settings.timerId = setInterval(() => {
    settings.timer += 1;
    SCORE_TIMER_SAVE.innerText = score.convertCount(settings.timer);
  }, 1000);
} else {
  document.body.append(createMainWindow());
}
