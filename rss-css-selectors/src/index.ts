import './styles/base/_base.scss';
import './style.scss';
import './styles/components/button.scss';
import './styles/components/popup.scss';
require('highlightjs/styles/hybrid.css');
import './styles/components/highlight.scss';

import '../src/components/foarm/foarm';
import '../src/components/animation/animation';
import '../src/components/level/level';
import { createNewLevel } from './modules/create-new-level';
import { curentLevel } from './modules/level-data';
import { Level } from './types/types';

// eslint-disable-next-line @typescript-eslint/no-var-requires
// const hljs = require('highlightjs');
// hljs.initHighlightingOnLoad();

createNewLevel((curentLevel.indexOf('curent') + 1) as Level);
