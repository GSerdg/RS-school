import Car from '../types/types';
import createCarModule from './create-car-module';
import createElement from './create-element';
import { CARS_ON_PAGE, dataObj } from './data';

export default function createGarage(data: Car[], page: number) {
  const PAGE_CONTAINER = createElement('div', ['page-container']);
  const PAGE_HEADER = createElement('h1', ['page__head'], undefined, `Garage(${data.length})`);
  const PAGE_NUMBER = createElement('h3', ['page__number'], undefined, `Page #${page}`);

  dataObj.countGarageCars = data.length;
  PAGE_CONTAINER.append(PAGE_HEADER, PAGE_NUMBER);
  let carNum: number;

  if (page * CARS_ON_PAGE <= data.length) {
    carNum = page * CARS_ON_PAGE;
  } else {
    carNum = page * CARS_ON_PAGE - (page * CARS_ON_PAGE - data.length);
  }

  for (let i = CARS_ON_PAGE * page - CARS_ON_PAGE; i < carNum; i += 1) {
    const CAR = createCarModule(data[i]);
    PAGE_CONTAINER.append(CAR);
  }

  return PAGE_CONTAINER;
}
