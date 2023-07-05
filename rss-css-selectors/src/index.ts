import '../src/components/foarm/foarm';
import '../src/components/animation/animation';
import { saveGame } from './modules/save-game';
import { loadGame } from './modules/load-game';

import './styles/base/_base.scss';
import './style.scss';
import './styles/components/button.scss';
import './styles/components/popup.scss';
import '../node_modules/highlightjs/styles/hybrid.css';
import './styles/components/highlight.scss';

loadGame();
saveGame();
