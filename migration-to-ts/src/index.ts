import App from './components/app/app';
import './global.css';
import { findNotNullElement, hideMenuButtons } from './types/index';

const app = new App();
app.start();

findNotNullElement(document.body, '.hidden-button').addEventListener('click', hideMenuButtons);
