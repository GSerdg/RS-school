function darkTheme() {
  const RESULTS = document.body.querySelector('.results');
  const NEW_INPUT = document.body.querySelector('.new__input');
  document.body.classList.add('body_theme');
  document.body.querySelectorAll('.table__cell').forEach((elem) => {
    elem.classList.add('table__cell_theme');
  });
  document.body.querySelectorAll('.menu__btn').forEach((elem) => {
    elem.classList.add('menu__btn_theme');
  });
  document.body.querySelector('.score').classList.add('score_theme');
  document.body.querySelector('.score__count__container').classList.add('score__count__container_theme');
  document.body.querySelector('.score__timer').classList.add('score__timer_theme');
  document.body.firstElementChild.classList.add('header_theme');
  if (RESULTS) {
    RESULTS.classList.add('results_theme');
    RESULTS.querySelectorAll('.results__cell').forEach((elem) => {
      elem.classList.add('results__cell_theme');
    });
    RESULTS.querySelector('.results__table').classList.add('results__table_theme');
  }
  if (NEW_INPUT) {
    NEW_INPUT.classList.add('new__input_theme');
  }
}

function lightTheme() {
  const RESULTS = document.body.querySelector('.results');
  const NEW_INPUT = document.body.querySelector('.new__input');
  document.body.classList.remove('body_theme');
  document.body.querySelectorAll('.table__cell').forEach((elem) => {
    elem.classList.remove('table__cell_theme');
  });
  document.body.querySelectorAll('.menu__btn').forEach((elem) => {
    elem.classList.remove('menu__btn_theme');
  });
  document.body.querySelector('.score').classList.remove('score_theme');
  document.body.querySelector('.score__count__container').classList.remove('score__count__container_theme');
  document.body.querySelector('.score__timer').classList.remove('score__timer_theme');
  document.body.firstElementChild.classList.remove('header_theme');
  if (RESULTS) {
    RESULTS.classList.remove('results_theme');
    RESULTS.querySelectorAll('.results__cell').forEach((elem) => {
      elem.classList.remove('results__cell_theme');
    });
    RESULTS.querySelector('.results__table').classList.remove('results__table_theme');
  }
  if (NEW_INPUT) {
    NEW_INPUT.classList.remove('new__input_theme');
  }
}

export { darkTheme, lightTheme };
