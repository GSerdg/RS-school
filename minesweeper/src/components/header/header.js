import './header.scss';
import createElement from '../../modules/createElement';
// import createMenu from '../menu/menu';

function createHeader() {
  const HEADER = createElement('header', ['header']);
  const WRAPPER = createElement('div', ['wrapper']);
  const HEADER_WRAPPER = createElement('div', ['header__wrapper']);
  // const HEADER_LOGO = createElement('div', ['header__logo']);
  const LOGO_IMG1 = createElement('img', ['logo__img']);
  const LOGO_IMG2 = createElement('img', ['logo__img']);
  const LOGO_HEADER = createElement('span', ['logo__header']);

  // const MENU = createMenu();
  LOGO_HEADER.innerText = 'Mineswipper';
  LOGO_IMG1.setAttribute('src', '/images/logo.png');
  LOGO_IMG1.setAttribute('alt', 'minesweeper-logo');
  LOGO_IMG2.setAttribute('src', '/images/logo.png');
  LOGO_IMG2.setAttribute('alt', 'minesweeper-logo');

  WRAPPER.append(HEADER_WRAPPER);

  // HEADER_LOGO.append(LOGO_IMG);
  HEADER_WRAPPER.append(LOGO_IMG1);
  HEADER_WRAPPER.append(LOGO_HEADER);
  HEADER_WRAPPER.append(LOGO_IMG2);
  // HEADER_WRAPPER.append(MENU);
  HEADER.append(WRAPPER);
  return HEADER;
}

export default createHeader;
