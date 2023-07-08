import createElement from './create-element';
import carSvg from './car-icon';
import findDomElement from './find-dom-element';
import Car from '../types/types';

function addAttribute(elem: HTMLElement, color: string) {
  const SVG = findDomElement(elem, 'g');
  SVG.setAttribute('style', `fill: ${color}`);
}

function createCarModule(carObj: Car) {
  const ELEMENT = createElement('div', ['car-module']);
  const BUTTONS_CONTAINER = createElement('div', ['car__btn']);
  const SELECT_BUTTON = createElement('button', ['btn'], undefined, 'SELECT');
  const REMOOVE_BUTTON = createElement('button', ['btn'], undefined, 'REMOOVE');
  const CAR_NAME = createElement('span', ['car-name'], undefined, carObj.name);
  const ENGINE_CONTAINER = createElement('div', ['car-engine']);
  const START_BUTTON = createElement('span', ['car__start', 'car__start_active'], undefined, 'A');
  const STOP_BUTTON = createElement('span', ['car__stop'], undefined, 'B');
  const CAR_ROAD = createElement('div', ['car-road']);
  const flagImg = '<img src="./sources/icons/flag.png" alt="flag" class="flag-img">';

  const promice = new Promise((res) => {
    CAR_ROAD.insertAdjacentHTML('beforeend', carSvg);
    CAR_ROAD.insertAdjacentHTML('beforeend', flagImg);
    res(addAttribute(CAR_ROAD, carObj.color));
  });

  promice.then();
  BUTTONS_CONTAINER.append(SELECT_BUTTON, REMOOVE_BUTTON, CAR_NAME);
  ENGINE_CONTAINER.append(START_BUTTON, STOP_BUTTON);
  ELEMENT.append(BUTTONS_CONTAINER, ENGINE_CONTAINER, CAR_ROAD);

  return ELEMENT;
}

export default function createPage(data: Car[]) {
  const PAGE_CONTAINER = createElement('div', ['page-container']);
  const PAGE_HEADER = createElement('h1', ['page__head'], undefined, `Garage(${data.length})`);
  const PAGE_NUMBER = createElement('h3', ['page__number'], undefined, 'Page #1');
  const PAGINATION = createElement('div', ['page__pagination']);
  const PREV_BUTTON = createElement('button', ['btn', 'btn_inactive'], undefined, 'PREV');
  const NEXT_BUTTON = createElement('button', ['btn', 'btn_inactive'], undefined, 'NEXT');

  PAGE_CONTAINER.append(PAGE_HEADER, PAGE_NUMBER);

  for (let i = 0; i < data.length; i += 1) {
    // TODO Проверить , если машин меньше 7
    const CAR = createCarModule(data[i]);
    PAGE_CONTAINER.append(CAR);
  }

  PAGINATION.append(PREV_BUTTON, NEXT_BUTTON);
  PAGE_CONTAINER.append(PAGINATION);

  return PAGE_CONTAINER;
}
