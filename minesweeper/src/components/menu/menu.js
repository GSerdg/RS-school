import './menu.scss';
import createElement from '../../modules/createElement';

function createMenu() {
  const MENU = createElement('nav', ['menu']);
  const MENU_LIST = createElement('ul', ['menu__list']);

  for (let i = 0; i < 4; i += 1) {
    const MENU_ITEM = createElement('li', ['menu__item']);
    const MENU_ITEM_WRAPPER = createElement('div', ['item__wrapper']);
    const MENU_ITEM_TITLE = createElement('span', ['item__title']);
    const title = ['New Game', 'Game difficulty', 'Results', 'Save Game'];
    MENU_ITEM_TITLE.innerText = title[i];
    MENU_ITEM_WRAPPER.append(MENU_ITEM_TITLE);
    MENU_ITEM.append(MENU_ITEM_WRAPPER);

    if (i === 1) {
      const DIFICULT_LIST = createElement('ul', ['menu__dificult__list']);
      for (let j = 0; j < 3; j += 1) {
        const DIFICULT_ITEM = createElement('li', ['dificult__item']);
        const DIFICULT_ITEM_WRAPPER = createElement('div', ['dificult__item__wrapper']);
        const DIFICULT_ITEM_TITLE = createElement('span', ['dificult__item__title']);
        const dificultTitle = ['Simple', 'Medium', 'Hard'];
        DIFICULT_ITEM_TITLE.innerText = dificultTitle[j];
        DIFICULT_ITEM_WRAPPER.append(DIFICULT_ITEM_TITLE);
        DIFICULT_ITEM.append(DIFICULT_ITEM_WRAPPER);
        DIFICULT_LIST.append(DIFICULT_ITEM);
      }
      MENU_ITEM.append(DIFICULT_LIST);
      DIFICULT_LIST.classList.add('hidden');
    }
    MENU_LIST.append(MENU_ITEM);
  }
  MENU.append(MENU_LIST);
  return MENU;
}

export default createMenu;
