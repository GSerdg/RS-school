import createElement from './create-element';
import Car from '../types/types';
import createCarModule from './create-car-module';
import { dataObj } from './data';

export default function createGarage(data: Car[], page: number) {
  const PAGE_CONTAINER = createElement('div', ['page-container']);
  const PAGE_HEADER = createElement('h1', ['page__head'], undefined, `Garage(${data.length})`);
  const PAGE_NUMBER = createElement('h3', ['page__number'], undefined, `Page #${page}`);

  dataObj.countGarageCars = data.length;
  PAGE_CONTAINER.append(PAGE_HEADER, PAGE_NUMBER);
  const carsOnPage = 7;
  let carNum: number;

  if (page * carsOnPage <= data.length) {
    carNum = page * carsOnPage;
  } else {
    carNum = page * carsOnPage - (page * carsOnPage - data.length);
  }

  for (let i = carsOnPage * page - carsOnPage; i < carNum; i += 1) {
    const CAR = createCarModule(data[i]);
    PAGE_CONTAINER.append(CAR);
  }

  return PAGE_CONTAINER;
}
