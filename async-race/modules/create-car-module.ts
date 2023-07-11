import Car from '../types/types';
// eslint-disable-next-line import/no-cycle
import { replasePage } from './app-utilites';
import carSvg from './car-icon';
import { BUTTON_TAG, dataObj } from './data';
import { createElement, findDomElement } from './dom-utilites';
import { deleteCar, getCar, updateCar } from './server-requests';

async function deleteCarEvents(event: MouseEvent) {
  const target = event.target as HTMLButtonElement;
  if (target.tagName !== BUTTON_TAG) return;

  const CAR_MODULE = target.parentElement?.parentElement as HTMLElement;
  const carId = +CAR_MODULE.id.split('-')[1];

  await deleteCar(carId);
  await replasePage(dataObj.page);
}

async function selectCarEvents(event: MouseEvent) {
  const target = event.target as HTMLButtonElement;
  if (target.tagName !== BUTTON_TAG) return;

  const CAR_MODULE = target.parentElement?.parentElement as HTMLElement;
  const carId = +CAR_MODULE.id.split('-')[1];
  const INPUT_UPDATE_CONTAINER = findDomElement(document.body, '#input-update');
  const INPUT_UPDATE_TEXT = INPUT_UPDATE_CONTAINER.firstElementChild as HTMLInputElement;
  const INPUT_UPDATE_COLOR = INPUT_UPDATE_TEXT.nextElementSibling as HTMLInputElement;
  const INPUT_UPDATE_BUTTON = INPUT_UPDATE_CONTAINER.lastElementChild as HTMLButtonElement;
  const data = await getCar(carId);

  if (data) {
    INPUT_UPDATE_TEXT.value = data.name;
    INPUT_UPDATE_COLOR.value = data.color;
  }

  INPUT_UPDATE_TEXT.focus();
  INPUT_UPDATE_TEXT.classList.remove('input-text_inactive');
  INPUT_UPDATE_BUTTON.classList.remove('btn_inactive');

  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  INPUT_UPDATE_BUTTON.addEventListener('click', updateCarEvents(carId, CAR_MODULE));
}

function addAttribute(elem: HTMLElement, color: string) {
  const SVG = findDomElement(elem, 'g');
  SVG.setAttribute('style', `fill: ${color}`);
}

export default function createCarModule(carObj: Car) {
  const ELEMENT = createElement('div', ['car-module'], `car-${carObj.id}`);
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

  SELECT_BUTTON.addEventListener('click', selectCarEvents);
  REMOOVE_BUTTON.addEventListener('click', deleteCarEvents);

  return ELEMENT;
}

function updateCarEvents(id: number, carModule: HTMLElement) {
  async function eventFunc(event: MouseEvent) {
    const target = event.target as HTMLButtonElement;
    if (target.tagName !== BUTTON_TAG) return;

    const BASE_COLOR = '#000000';
    const INPUT_COLOR = target.previousElementSibling as HTMLInputElement;
    const INPUT_MODEL = INPUT_COLOR.previousElementSibling as HTMLInputElement;

    if (!INPUT_MODEL.value) return;

    const data = await updateCar(INPUT_MODEL.value, INPUT_COLOR.value, id);

    if (data) {
      carModule.replaceWith(createCarModule(data));
    }

    INPUT_MODEL.value = '';
    INPUT_MODEL.classList.add('input-text_inactive');
    INPUT_COLOR.value = BASE_COLOR;
    target.classList.add('btn_inactive');

    target.removeEventListener('click', eventFunc);
  }
  return eventFunc;
}
