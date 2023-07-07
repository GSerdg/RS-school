import createElement from './modules/create-element';
import { createGarageMenu, createPageBtns } from './modules/create-garage-menu';
import './style.scss';
import './styles/base/_base.scss';
import './styles/components/button.scss';

const WRAPPER = createElement('div', ['wrapper']);

WRAPPER.append(createPageBtns(), createGarageMenu());
document.body.append(WRAPPER);
