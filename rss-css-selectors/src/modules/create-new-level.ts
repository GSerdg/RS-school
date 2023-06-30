import { curentLevel } from './level-data';
import { Level } from '../types/types';
import { createViewAnimationElements } from './create-animation-elements';
import { createViewHtml } from './create-html';
import { findDomElement } from './find-dom-element';
import { levelData } from './level-data';

export function createNewLevel(level: Level) {
  const VIEWER = findDomElement(document.body, '.text-foarm_viewer');
  const ANIMATION = findDomElement(document.body, '.animation');

  VIEWER.append(createViewHtml(levelData[level]));
  ANIMATION.prepend(createViewAnimationElements(levelData[level]));
  curentLevel[level - 1] = 'curent';

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const hljs = require('highlightjs');
  document.querySelectorAll('pre code').forEach((block) => {
    hljs.highlightBlock(block);
  });
}
