import feelMines from './feelMinesField';
import settings from './settings';
import score from '../components/score-field/score';
import createPopup from '../components/popup/popup';
import createElement from './createElement';

function playAudio(src) {
  const audio = createElement('audio', ['audio']);
  audio.setAttribute('autoplay', 'true');
  audio.innerHTML = `<source src=${src} type="audio/mp3">`;
  const oldAudio = document.body.querySelectorAll('.audio');
  if (oldAudio.length > 0) {
    oldAudio.forEach((elem) => elem.remove());
  }
  document.body.appendChild(audio);
}

function changeTheme(event) {
  const { target } = event;
  if (target.tagName !== 'INPUT') return;
  if (target.id === 'theme1') {
    const input2 = target.parentNode.querySelector('#theme2');
    input2.removeAttribute('checked');
    target.setAttribute('checked', '');
    settings.theme = 'light';

    document.body.classList.remove('body_theme');
    console.log(settings.theme);
  } else {
    const input1 = target.parentNode.querySelector('#theme1');
    input1.removeAttribute('checked');
    target.setAttribute('checked', '');
    settings.theme = 'dark';

    document.body.classList.add('body_theme');
    console.log(settings.theme);
  }
}

function setFlag(event) {
  event.preventDefault();
  const { target } = event;
  const TD = target.closest('td');
  if (!TD || Array.from(TD.classList).includes('table__cell_open')) return;
  if (!settings.rowExcl) return;
  const FLAG_COUNT = document.body.querySelector('.flag__count');
  const MINE_COUNT = document.body.querySelector('.mine__count');

  if (Array.from(TD.firstElementChild.classList).includes('hidden')) {
    settings.flagCount += 1;
    playAudio('./audio/flag-set.mp3');
    FLAG_COUNT.innerText = `flags: ${settings.flagCount}`;
    if (settings.mineCount > 0) {
      settings.mineCount -= 1;
      MINE_COUNT.innerText = `mines: ${settings.mineCount}`;
    }
  } else {
    settings.flagCount -= 1;
    playAudio('./audio/flag-clear.mp3');
    FLAG_COUNT.innerText = `flags: ${settings.flagCount}`;
    if (settings.mineCount < settings.mine && settings.flagCount < settings.mine) {
      settings.mineCount += 1;
      MINE_COUNT.innerText = `mines: ${settings.mineCount}`;
    }
  }

  const IMG = TD.firstElementChild;
  if (IMG.classList.length === 2) {
    IMG.setAttribute('src', './images/flag.png');
    IMG.classList.remove('hidden');
  } else {
    IMG.setAttribute('src', './images/mine.png');
    IMG.classList.add('hidden');
  }
}

function getExclIndex(event) {
  const { target } = event;
  if (target.tagName !== 'TD' || localStorage.getItem('startGame') !== 'start') return;
  const SCORE_TIMER = document.body.querySelector('.score__timer');
  const TABLE = target.closest('table');
  localStorage.setItem('startGame', 'game');
  settings.timerId = setInterval(() => {
    settings.timer += 1;
    SCORE_TIMER.innerText = score.convertCount(settings.timer);
  }, 1000);

  settings.cellExcl = target.cellIndex;
  settings.rowExcl = target.parentElement.rowIndex;
  const mines = feelMines(
    settings.row,
    settings.cell,
    settings.mine,
    settings.rowExcl,
    settings.cellExcl,
  );
  settings.fieldMatrix = mines.minesNumbers;
  settings.minesArray = mines.minesArray;
  TABLE.addEventListener('contextmenu', setFlag);
}

function cellClick(event) {
  const { target } = event;
  const TABLE = target.closest('table');
  const TD = target.closest('td');
  if (!TD || Array.from(TD.classList).includes('table__cell_open')) return;
  const IMG = TD.firstElementChild;
  const cell = TD.cellIndex;
  const row = TD.parentElement.rowIndex;
  const scoreCount = document.body.querySelector('.score__count');
  playAudio('./audio/fail.mp3');

  function openCells(i, j) {
    const elemTd = TABLE.rows[i].cells[j];
    const elemImg = elemTd.firstElementChild;
    elemTd.classList.add('table__cell_open');
    elemImg.classList.add('hidden');
    settings.cellCouner += 1;
    if (Number.isInteger(settings.fieldMatrix[i][j]) && settings.fieldMatrix[i][j] !== 0) {
      elemTd.innerText = settings.fieldMatrix[i][j];
      elemTd.classList.add(`table__cell_color-${settings.fieldMatrix[i][j]}`);
      return;
    }
    // Если открыли мину
    if (settings.fieldMatrix[i][j] === 'mine') {
      elemImg.classList.remove('hidden');
      // settings.gemeOverFlag = true;
      TABLE.removeEventListener('click', cellClick);
      TABLE.removeEventListener('contextmenu', setFlag);

      settings.minesArray.forEach((element) => {
        const a = Math.floor(element / settings.cell);
        const b = element - settings.cell * a;
        const TD_MINE = TABLE.rows[a].cells[b];
        if (Array.from(TD_MINE.firstElementChild.classList).includes('hidden')) {
          TD_MINE.firstElementChild.classList.remove('hidden');
          TD_MINE.classList.add('table__cell_open');
        }
      });
      clearInterval(settings.timerId);
      // localStorage.clear();
      // localStorage.removeItem('settings');
      // localStorage.removeItem('main');
      localStorage.setItem('startGame', 'finish');
      TD.classList.add('table__cell_fail');
      document.body.querySelector('.score__menu').append(createPopup('Game over. Try again.'));
      settings.cellCouner = 0;
      playAudio('./audio/game-over.mp3');
      console.log('game over');
      return;
    }
    if (settings.fieldMatrix[i][j] === 0) {
      if (j > 0 && !Array.from(TABLE.rows[i].cells[j - 1].classList).includes('table__cell_open') && TABLE.rows[i].cells[j - 1].firstElementChild.classList.length !== 1) openCells(i, j - 1);
      if (j > 0 && i > 0 && !Array.from(TABLE.rows[i - 1].cells[j - 1].classList).includes('table__cell_open') && TABLE.rows[i - 1].cells[j - 1].firstElementChild.classList.length !== 1) openCells(i - 1, j - 1);
      if (i > 0 && !Array.from(TABLE.rows[i - 1].cells[j].classList).includes('table__cell_open') && TABLE.rows[i - 1].cells[j].firstElementChild.classList.length !== 1) openCells(i - 1, j);
      if (i > 0 && j < settings.cell - 1 && !Array.from(TABLE.rows[i - 1].cells[j + 1].classList).includes('table__cell_open') && TABLE.rows[i - 1].cells[j + 1].firstElementChild.classList.length !== 1) openCells(i - 1, j + 1);
      if (j < settings.cell - 1 && !Array.from(TABLE.rows[i].cells[j + 1].classList).includes('table__cell_open') && TABLE.rows[i].cells[j + 1].firstElementChild.classList.length !== 1) openCells(i, j + 1);
      if (i < settings.row - 1 && j < settings.cell - 1 && !Array.from(TABLE.rows[i + 1].cells[j + 1].classList).includes('table__cell_open') && TABLE.rows[i + 1].cells[j + 1].firstElementChild.classList.length !== 1) openCells(i + 1, j + 1);
      if (i < settings.row - 1 && !Array.from(TABLE.rows[i + 1].cells[j].classList).includes('table__cell_open') && TABLE.rows[i + 1].cells[j].firstElementChild.classList.length !== 1) openCells(i + 1, j);
      if (j > 0 && i < settings.row - 1 && !Array.from(TABLE.rows[i + 1].cells[j - 1].classList).includes('table__cell_open') && TABLE.rows[i + 1].cells[j - 1].firstElementChild.classList.length !== 1) openCells(i + 1, j - 1);
    }
  }

  // Счетчик ходов
  if (Array.from(IMG.classList).includes('hidden')) {
    playAudio('./audio/cell-open.mp3');
    openCells(row, cell);
    settings.stepCount += 1;
    console.log('cellCouner', settings.cellCouner, settings.cell, settings.row, settings.mine, settings.gemeOverFlag);
    scoreCount.innerText = score.convertCount(settings.stepCount);
    // Если победили
    if (settings.cellCouner === settings.cell * settings.row - settings.mine) {
      TABLE.removeEventListener('click', cellClick);
      TABLE.removeEventListener('contextmenu', setFlag);

      clearInterval(settings.timerId);
      // localStorage.clear();
      // localStorage.removeItem('settings');
      // localStorage.removeItem('main');
      localStorage.setItem('startGame', 'finish');
      document.body.querySelector('.score__menu').append(createPopup(`Hooray! You found all mines in ${settings.timer} seconds and ${settings.stepCount} moves!`));
      settings.results.push([settings.level, settings.mine, settings.timer, settings.stepCount]);
      if (settings.results.length === 11) settings.results.shift();
      settings.cellCouner = 0;
      playAudio('./audio/win.mp3');
      console.log('finish game');
      console.log(settings);
    }
  }
}

export {
  cellClick, getExclIndex, setFlag, changeTheme,
};
