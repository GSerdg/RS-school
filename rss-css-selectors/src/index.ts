import './styles/base/_base.scss';
import './style.scss';

//import './components/animation/animation.scss';
//import './components/foarm/foarm.scss';
//import './components/level/level.scss';
import './styles/components/button.scss';

import '../src/components/foarm/foarm';
import '../src/components/animation/animation';
import '../src/components/level/level';
import { createNewLevel } from './modules/create-new-level';

createNewLevel(1);
