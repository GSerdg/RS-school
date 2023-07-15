import { createGarageMenu } from './modules/create-garage-menu';
import { createGarage } from './modules/create-garage';
import { dataObj } from './modules/data';
import { getCars } from './modules/server-requests';
import createPagination from './modules/create-pagination';
import { createElement } from './modules/dom-utilites';
import createPageBtns from './modules/create-page-btns';
import './style.scss';
import './styles/base/_base.scss';
import './styles/components/button.scss';

(async () => {
  const WRAPPER_GARAGE = createElement('div', ['wrapper']);

  WRAPPER_GARAGE.append(createPageBtns(), createGarageMenu());
  const getCarsData = await getCars(dataObj.page, dataObj.limit);

  if (getCarsData) {
    WRAPPER_GARAGE.append(createGarage(getCarsData, dataObj.page), createPagination('garage'));
  }

  document.body.append(WRAPPER_GARAGE);
})();
