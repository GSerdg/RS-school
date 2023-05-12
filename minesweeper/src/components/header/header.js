import './header.scss';
import createElement from '../../modules/createElement';
import createMenu from '../menu/menu';

function createHeader() {
  const HEADER = createElement('header', ['header']);
  const WRAPPER = createElement('div', ['wrapper']);
  const HEADER_WRAPPER = createElement('div', ['header__wrapper']);
  const HEADER_LOGO = createElement('div', ['header__logo']);
  const LOGO_IMG = createElement('img', ['logo__img']);
  const MENU = createMenu();

  LOGO_IMG.setAttribute('src', '/images/logo.png');
  LOGO_IMG.setAttribute('alt', 'minesweeper-logo');

  WRAPPER.append(HEADER_WRAPPER);
  HEADER_LOGO.append(LOGO_IMG);
  HEADER_WRAPPER.append(HEADER_LOGO);
  HEADER_WRAPPER.append(MENU);
  HEADER.append(WRAPPER);
  return HEADER;
}

export default createHeader;
