import './main.scss';
import createElement from '../../modules/createElement';
import field from '../game-field/field';
import settings from '../../modules/settings';

function createMainWindow() {
  const MAIN = createElement('main', ['main']);
  const FIELD = createElement('div', ['field']);
  const WRAPPER = createElement('div', ['wrapper']);

  if (settings.theme === 'dark') document.body.classList.add('body_theme');
  WRAPPER.append(field.createGameField(settings.cell, settings.row));
  FIELD.append(WRAPPER);
  MAIN.append(FIELD);

  return MAIN;
}

export default createMainWindow;
