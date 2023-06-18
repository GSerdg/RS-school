// import './foarm.scss';
import { createViewHtml } from '../../modules/create-html';
import { findDomElement } from '../../modules/find-dom-element';
import { levelData } from '../../modules/level-data';
const level = 2;
const VIEWER = findDomElement(document.body, '.text-foarm_viewer');
VIEWER.append(createViewHtml(levelData[level]));
