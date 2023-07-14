import { createGarageMenu } from './modules/create-garage-menu';
import { createGarage } from './modules/create-garage';
import { dataObj } from './modules/data';
import { getCars } from './modules/server-requests';
import createPagination from './modules/create-pagination';
import { createElement } from './modules/dom-utilites';
import './style.scss';
import './styles/base/_base.scss';
import './styles/components/button.scss';
import createPageBtns from './modules/create-page-btns';

(async () => {
  const WRAPPER_GARAGE = createElement('div', ['wrapper']);
  const WRAPPER_RESULTS = createElement('div', ['wrapper', 'wrapper_absolute', 'wrapper_hidden']);

  WRAPPER_GARAGE.append(createPageBtns(), createGarageMenu());
  const getCarsData = await getCars(dataObj.page, dataObj.limit);

  if (getCarsData) {
    WRAPPER_GARAGE.append(createGarage(getCarsData, dataObj.page), createPagination('garage'));
  }

  WRAPPER_RESULTS.append(createPageBtns());
  WRAPPER_RESULTS.append(createPagination('results'));

  document.body.append(WRAPPER_GARAGE);
  document.body.append(WRAPPER_RESULTS);
})();
