import './styles/base/_base.scss';
import createElement from './modules/createElement';
import createHeader from './components/header/header';
import createMainWindow from './components/main/main';
import saveGame from './modules/save';
import score from './components/score-field/score';
import settings from './modules/settings';
import {
  cellClick, getExclIndex, setFlag, changeTheme,
} from './modules/events';
import createResultsTable from './components/results-table/table';
import { darkTheme, lightTheme } from './modules/theme';

const media780 = window.matchMedia('(max-width: 780px)');

function media(event) {
  const cells = document.body.querySelectorAll('.table__cell');
  if (event.matches) {
    cells.forEach((elem) => {
      elem.classList.add('table__cell_width');
    });
  } else {
    cells.forEach((elem) => {
      elem.classList.remove('table__cell_width');
    });
  }
}

function StartNewGame() {
  const radio = Array.from(document.body.querySelectorAll('.input__width__check'));
  for (let i = 0; i < 3; i += 1) {
    if (radio[i].checked) {
      settings.level = radio[i].value;
      switch (radio[i].value) {
        case 'small':
          settings.cell = 10;
          settings.row = 10;
          media780.removeEventListener('change', media);
          break;
        case 'medium':
          settings.cell = 15;
          settings.row = 15;
          media780.removeEventListener('change', media);
          break;
        case 'hard':
          settings.cell = 25;
          settings.row = 25;
          media780.addEventListener('change', media);
          break;
        default:
          break;
      }
      break;
    }
  }
  settings.mine = +document.body.querySelector('.mines__range').value;
  settings.mineCount = +document.body.querySelector('.mines__range').value;
  settings.flagCount = 0;
  localStorage.setItem('startGame', 'start');
  clearInterval(settings.timerId);
  settings.timer = 0;
  settings.stepCount = 0;
  settings.cellCouner = 0;
  document.body.querySelector('.main').remove();
  document.body.append(createMainWindow());
  saveGame();

  if (settings.theme === 'dark') {
    darkTheme();
  } else {
    lightTheme();
  }
}
// Управляет слушателями для открытия и закрытия окна настроек
function settingsMenu() {
  const TABLE = document.body.querySelector('.table');
  const ELEM = document.body.querySelector('.score__menu');

  function closeSettingsMenu(event) {
    const { target } = event;
    const MENU = target.closest('.new__input');

    if (MENU || target.classList[0] === 'menu__btn') return;
    if (target.tagName === 'INPUT' || target.tagName === 'LABEL') return;
    ELEM.lastChild.remove();
    document.removeEventListener('click', closeSettingsMenu);
    if (localStorage.getItem('startGame') !== 'finish') {
      TABLE.addEventListener('click', getExclIndex, { once: true });
      TABLE.addEventListener('click', cellClick);
    }
    if (localStorage.getItem('startGame') === 'game') {
      TABLE.addEventListener('contextmenu', setFlag);
    }
  }

  ELEM.append(score.createSettingsMenu());
  TABLE.removeEventListener('click', cellClick);
  TABLE.removeEventListener('contextmenu', setFlag);
  TABLE.removeEventListener('click', getExclIndex);
  document.addEventListener('click', closeSettingsMenu);
}

function resultsTable() {
  const ELEM = document.body.querySelector('.score__menu');
  const TABLE = document.body.querySelector('.table');

  ELEM.append(createResultsTable(settings.results));
  TABLE.removeEventListener('click', cellClick);
  TABLE.removeEventListener('contextmenu', setFlag);
  TABLE.removeEventListener('click', getExclIndex);
}

let saveSettings;
if (localStorage.getItem('settings')) saveSettings = JSON.parse(localStorage.settings);

document.body.append(createHeader());
saveGame();
score.BTN_START.addEventListener('click', StartNewGame);
score.BTN_NEW.addEventListener('click', settingsMenu);
score.BTN_RESULTS.addEventListener('click', resultsTable);

// Если был reload во время игры
if (localStorage.settings !== undefined) {
  const MAIN = createElement('main', ['main']);
  document.body.append(MAIN);
  const saveSettingsKeys = Object.keys(saveSettings);
  saveSettingsKeys.forEach((key) => {
    settings[key] = saveSettings[key];
  });

  if (localStorage.getItem('startGame') === 'start') {
    document.body.querySelector('.main').remove();
    document.body.append(createMainWindow());
  } else {
    MAIN.innerHTML = localStorage.getItem('main');
    const TABLE_SAVE = MAIN.querySelector('.table');
    const SCORE_TIMER_SAVE = MAIN.querySelector('.score__timer');
    const NEW_GAME_BTN = MAIN.querySelectorAll('.menu__btn')[0];
    const RESULTS_BTN = MAIN.querySelectorAll('.menu__btn')[1];
    const RESULTS = document.body.querySelector('.results');
    const NEW_INPUT = document.body.querySelector('.new__input');

    if (localStorage.getItem('startGame') === 'game') {
      TABLE_SAVE.addEventListener('click', cellClick);
      TABLE_SAVE.addEventListener('contextmenu', setFlag);
      TABLE_SAVE.addEventListener('click', getExclIndex, { once: true });
    }
    NEW_GAME_BTN.addEventListener('click', settingsMenu);
    RESULTS_BTN.addEventListener('click', resultsTable);
    document.body.querySelector('.field__theme').addEventListener('change', changeTheme);

    if (RESULTS) RESULTS.remove();
    if (NEW_INPUT) NEW_INPUT.remove();
    if (localStorage.getItem('startGame') === 'game') {
      settings.timerId = setInterval(() => {
        settings.timer += 1;
        SCORE_TIMER_SAVE.innerText = score.convertCount(settings.timer);
      }, 1000);
    }
  }
} else {
  localStorage.setItem('startGame', 'start');
  document.body.append(createMainWindow());
}

if (settings.theme === 'dark') {
  darkTheme();
} else {
  lightTheme();
}

if (document.body.querySelectorAll('.table__cell').length > 624) {
  media780.addEventListener('change', media);
} else {
  media780.removeEventListener('change', media);
}
