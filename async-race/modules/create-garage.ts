import { Car } from '../types/types';
import changePaginationStatus, { startCar, stopCar } from './app-utilites';
import carSvg from './car-icon';
import { BUTTON_TAG, dataObj, SPAN_TAG } from './data';
import { createElement, findDomElement } from './dom-utilites';
import { deleteCar, driveCarEngine, getCar, getCars, startStopCarEngine, updateCar } from './server-requests';

function addAttribute(elem: HTMLElement, color: string) {
  const SVG = findDomElement(elem, 'g');
  SVG.setAttribute('style', `fill: ${color}`);
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
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
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

async function deleteCarEvents(event: MouseEvent) {
  const target = event.target as HTMLButtonElement;
  if (target.tagName !== BUTTON_TAG) return;

  const CAR_MODULE = target.parentElement?.parentElement as HTMLElement;
  const carId = +CAR_MODULE.id.split('-')[1];

  await deleteCar(carId);
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
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

  INPUT_UPDATE_BUTTON.addEventListener('click', updateCarEvents(carId, CAR_MODULE));
}

async function startCarEngineEvents(event: MouseEvent) {
  const target = event.target as HTMLButtonElement;
  if (target.tagName !== SPAN_TAG) return;

  const stopCarError = "Car has been stopped suddenly. It's engine was broken down.";
  const CAR_MODULE = target.parentElement?.parentElement as HTMLElement;
  const CAR = CAR_MODULE.lastElementChild?.firstElementChild as HTMLElement;
  const carId = +CAR_MODULE.id.split('-')[1];

  const content = await startStopCarEngine('started', carId);
  if (content) {
    const animationTime = content.distance / content.velocity;

    window.requestAnimationFrame(startCar(CAR, CAR_MODULE, animationTime));
    const rezult = driveCarEngine(carId);
    rezult
      .then((res) => {
        if (res?.success) {
          console.log('car win');
        }
      })
      .catch((err) => {
        if (err.message === stopCarError) {
          window.requestAnimationFrame(stopCar(CAR));
        }
      });
  }
}

export function createCarModule(carObj: Car) {
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
  START_BUTTON.addEventListener('click', startCarEngineEvents);
  // STOP_BUTTON.addEventListener('click', stopCarEngineEvents);

  return ELEMENT;
}

export function createGarage(data: Car[], page: number) {
  const PAGE_CONTAINER = createElement('div', ['page-container']);
  const PAGE_HEADER = createElement('h1', ['page__head'], undefined, `Garage(${dataObj.countGarageCars})`);
  const PAGE_NUMBER = createElement('h3', ['page__number'], undefined, `Page #${page}`);

  PAGE_CONTAINER.append(PAGE_HEADER, PAGE_NUMBER);
  for (let i = 0; i < data.length; i += 1) {
    const CAR = createCarModule(data[i]);
    PAGE_CONTAINER.append(CAR);
  }

  return PAGE_CONTAINER;
}

export async function replasePage(page: number) {
  const getCarsData = await getCars(page, dataObj.limit);
  const PAGE_CONTAINER = findDomElement(document.body, '.page-container');

  if (getCarsData) {
    PAGE_CONTAINER.replaceWith(createGarage(getCarsData, page));
  }

  changePaginationStatus();
}
