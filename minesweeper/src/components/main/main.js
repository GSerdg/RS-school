import './main.scss';
import createElement from '../../modules/createElement';
import field from '../game-field/field';

function createMainWindow() {
  const MAIN = createElement('main', ['main']);
  const FIELD = createElement('div', ['field']);
  const WRAPPER = createElement('div', ['wrapper']);

  WRAPPER.append(field.createGameField(10, 10));
  FIELD.append(WRAPPER);
  MAIN.append(FIELD);

  return MAIN;
}

export default createMainWindow;
