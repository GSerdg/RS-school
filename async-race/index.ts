import createElement from './modules/create-element';
import { createGarageMenu, createPageBtns } from './modules/create-garage-menu';
import createPage from './modules/create-page';
import { dataObj } from './modules/data';
import getCars from './modules/get-cars';
import './style.scss';
import './styles/base/_base.scss';
import './styles/components/button.scss';

(async () => {
  const WRAPPER = createElement('div', ['wrapper']);

  WRAPPER.append(createPageBtns(), createGarageMenu());
  const getCarsData = await getCars();
  WRAPPER.append(createPage(getCarsData, dataObj.page));
  document.body.append(WRAPPER);
})();
