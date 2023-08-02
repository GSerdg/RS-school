import { createGarageMenu } from './modules/create-garage-menu';
import { createGarage } from './modules/create-garage';
import { dataObj } from './modules/data';
import { getCars } from './modules/api';
import createPagination from './modules/create-pagination';
import { createElement } from './modules/dom-utilites';
import createPageBtns from './modules/create-page-btns';
import './style.scss';

(async () => {
  const WRAPPER_GARAGE = createElement('div', ['wrapper']);

  WRAPPER_GARAGE.append(createPageBtns(), createGarageMenu());
  const getCarsData = await getCars(dataObj.page, dataObj.limit);

  if (getCarsData) {
    WRAPPER_GARAGE.append(createGarage(getCarsData, dataObj.page), createPagination('garage'));
  }

  document.body.append(WRAPPER_GARAGE);
})();
