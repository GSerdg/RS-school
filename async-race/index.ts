import { createGarageMenu, createPageBtns } from './modules/create-garage-menu';
import createGarage from './modules/create-garage';
import { dataObj } from './modules/data';
import { getCars } from './modules/server-requests';
import './style.scss';
import './styles/base/_base.scss';
import './styles/components/button.scss';
import createPagination from './modules/create-pagination';
import createElement from './modules/create-element';

(async () => {
  const WRAPPER = createElement('div', ['wrapper']);

  WRAPPER.append(createPageBtns(), createGarageMenu());
  const getCarsData = await getCars();
  WRAPPER.append(createGarage(getCarsData, dataObj.page), createPagination());
  document.body.append(WRAPPER);
})();
