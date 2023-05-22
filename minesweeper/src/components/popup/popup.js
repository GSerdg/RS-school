import './popup.scss';
import createElement from '../../modules/createElement';
import settings from '../../modules/settings';

function createPopup(title) {
  const POPUP = createElement('div', ['new__input', 'new__input_popup']);
  const POPUP_TITLE = createElement('p', ['popup__title']);
  const POPUP_BTN = createElement('div', ['menu__btn']);

  POPUP_TITLE.innerText = title;
  POPUP_BTN.innerText = 'OK';
  POPUP.append(POPUP_TITLE);
  POPUP.append(POPUP_BTN);

  POPUP_BTN.addEventListener('click', () => {
    POPUP.remove();
  });

  if (settings.theme === 'dark') {
    POPUP.classList.add('new__input_theme');
    POPUP_BTN.classList.add('menu__btn_theme');
  }

  return POPUP;
}

export default createPopup;
