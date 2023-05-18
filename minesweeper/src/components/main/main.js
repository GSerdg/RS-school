import './main.scss';
import createElement from '../../modules/createElement';
import field from '../game-field/field';
import settings from '../../modules/settings';

function createMainWindow() {
  const MAIN = createElement('main', ['main']);
  const FIELD = createElement('div', ['field']);
  const WRAPPER = createElement('div', ['wrapper']);

  WRAPPER.append(field.createGameField(settings.cell, settings.row));
  FIELD.append(WRAPPER);
  MAIN.append(FIELD);

  return MAIN;
}

export default createMainWindow;
