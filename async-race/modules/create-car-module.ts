import Car from '../types/types';
import carSvg from './car-icon';
import { BUTTON_TAG } from './data';
import { createElement, findDomElement } from './dom-utilites';
import { getCar, updateCar } from './server-requests';

async function selectCar(event: MouseEvent) {
  const target = event.target as HTMLButtonElement;
  if (target.tagName !== BUTTON_TAG) return;

  const CAR_MODULE = target.previousElementSibling?.previousElementSibling as HTMLElement;
  const carId = +CAR_MODULE.id.split('-')[1];
  const INPUT_UPDATE_CONTAINER = findDomElement(document.body, '#input-update');
  const INPUT_UPDATE_TEXT = INPUT_UPDATE_CONTAINER.firstElementChild as HTMLInputElement;
  const INPUT_UPDATE_COLOR = INPUT_UPDATE_TEXT.nextElementSibling as HTMLInputElement;
  const INPUT_UPDATE_BUTTON = INPUT_UPDATE_CONTAINER.lastElementChild as HTMLButtonElement;
  const data = await getCar(carId);

  // INPUT_UPDATE_TEXT.value = '';
  INPUT_UPDATE_TEXT.value = data.name;
  INPUT_UPDATE_TEXT.focus();
  INPUT_UPDATE_COLOR.value = data.color;
  INPUT_UPDATE_BUTTON.classList.remove('btn_inactive');

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

  SELECT_BUTTON.addEventListener('click', selectCar);

  return ELEMENT;
}

function updateCarEvents(id: number, carModule: HTMLElement) {
  return async (event: MouseEvent) => {
    const target = event.target as HTMLButtonElement;
    if (target.tagName !== BUTTON_TAG) return;

    const INPUT_COLOR = target.previousElementSibling as HTMLInputElement;
    const INPUT_MODEL = INPUT_COLOR.previousElementSibling as HTMLInputElement;

    if (!INPUT_MODEL.value) return;

    const data = await updateCar(INPUT_MODEL.value, INPUT_COLOR.value, id);
    carModule.replaceWith(createCarModule(data));
  };
}
/* async function updateCarEvents(event: MouseEvent) {
  const target = event.target as HTMLButtonElement;
  if (target.tagName !== BUTTON_TAG) return;

  const INPUT_COLOR = target.previousElementSibling as HTMLInputElement;
  const INPUT_MODEL = INPUT_COLOR.previousElementSibling as HTMLInputElement;

  if (!INPUT_MODEL.value) return;

  const data = await updateCar(INPUT_MODEL.value, INPUT_COLOR.value, carId);
  
}
 */


