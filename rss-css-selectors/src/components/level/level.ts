import './level.scss';
import { createLevelsElement } from '../../modules/create-levels';
import { createElement } from '../../modules/create-element';
import { levelData } from '../../modules/level-data';
import { findDomElement } from '../../modules/find-dom-element';

const HEADER = createElement('h2', ['right-field__title'], undefined, 'Level');
const RESET_BTN = createElement('button', ['btn'], undefined, 'Reset progress');
const HELP_BTN = createElement('button', ['btn'], undefined, 'Help');
const LEVELS_LIST = createLevelsElement(levelData);
const RIGHT_FIELD = findDomElement(document.body, '.right-field');

RIGHT_FIELD.append(HEADER, LEVELS_LIST, RESET_BTN, HELP_BTN);
