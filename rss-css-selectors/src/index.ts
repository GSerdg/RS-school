import './styles/base/_base.scss';
import './style.scss';
import './styles/components/button.scss';
import './styles/components/popup.scss';

import '../src/components/foarm/foarm';
import '../src/components/animation/animation';
import '../src/components/level/level';
import { createNewLevel } from './modules/create-new-level';
import { curentLevel } from './modules/level-data';
import { Level } from './types/types';

createNewLevel((curentLevel.indexOf('curent') + 1) as Level);
