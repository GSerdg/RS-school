import './popup.scss';
import createElement from '../../modules/createElement';

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
  return POPUP;
}

export default createPopup;
