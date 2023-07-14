import { Car } from '../types/types';
import { changePaginationGarageStatus, returnCar, animateMoveCar, stopAnimateCar } from './app-utilites';
import carSvg from './car-icon';
// eslint-disable-next-line import/no-cycle
import { carsResetEvent } from './cars-race';
// eslint-disable-next-line import/no-cycle
import { carsRaceEvent } from './create-garage-menu';
import { BUTTON_TAG, carReturn, controller, dataObj, itFirstCar, SPAN_TAG } from './data';
import { createElement, findDomElement } from './dom-utilites';
import {
  deleteCar,
  deleteWinner,
  driveCarEngine,
  getCar,
  getCars,
  startStopCarEngine,
  updateCar,
} from './server-requests';

export function addAttribute(elem: HTMLElement, color: string) {
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
  await deleteWinner(carId);
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

function stopCarEngineEvents(event: MouseEvent) {
  const target = event.target as HTMLButtonElement;
  if (target.tagName !== SPAN_TAG) return;

  const CAR_MODULE = target.parentElement?.parentElement as HTMLElement;

  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  stopCar(CAR_MODULE);
}

function startCarEngineEvents(event: MouseEvent) {
  const target = event.target as HTMLButtonElement;
  if (target.tagName !== SPAN_TAG) return;
  const CAR_MODULE = target.parentElement?.parentElement as HTMLElement;

  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  startCar(CAR_MODULE);
}

export async function startCar(carModule: HTMLElement, race?: true) {
  const stopCarError = "Car has been stopped suddenly. It's engine was broken down.";
  const carId = +carModule.id.split('-')[1];
  const CAR = carModule.lastElementChild?.firstElementChild as HTMLElement;
  const STOP_BUTTON = carModule.firstElementChild?.nextElementSibling?.lastElementChild as HTMLButtonElement;
  const START_BUTTON = carModule.firstElementChild?.nextElementSibling?.firstElementChild as HTMLButtonElement;
  const RACE_BUTTON = findDomElement<HTMLButtonElement>(document.body, '#race');

  START_BUTTON.removeEventListener('click', startCarEngineEvents);
  START_BUTTON.classList.remove('car__start_active');
  RACE_BUTTON.removeEventListener('click', carsRaceEvent);
  RACE_BUTTON.classList.add('btn_inactive');

  const content = await startStopCarEngine('started', carId);
  STOP_BUTTON.addEventListener('click', stopCarEngineEvents);
  STOP_BUTTON.classList.add('car__start_active');
  carReturn.set(carId, true);

  if (content) {
    const animationTime = content.distance / content.velocity;

    window.requestAnimationFrame(animateMoveCar(CAR, carModule, animationTime));
    const rezult = driveCarEngine(carId);
    rezult
      .then((res) => {
        if (res?.success && carReturn.get(carId)) {
          if (itFirstCar.value && race) {
            console.log('car win', carId, (animationTime / 1000).toFixed(2));
            itFirstCar.value = false;
          }
        }
      })
      .catch((err) => {
        if (err.message === stopCarError && carReturn.get(carId)) {
          window.requestAnimationFrame(stopAnimateCar(CAR));
        }
      });
  }
}

export async function stopCar(carModule: HTMLElement) {
  const carId = +carModule.id.split('-')[1];
  const CAR = carModule.lastElementChild?.firstElementChild as HTMLElement;
  const STOP_BUTTON = carModule.firstElementChild?.nextElementSibling?.lastElementChild as HTMLButtonElement;
  const START_BUTTON = carModule.firstElementChild?.nextElementSibling?.firstElementChild as HTMLButtonElement;
  const RACE_BUTTON = findDomElement<HTMLButtonElement>(document.body, '#race');

  STOP_BUTTON.removeEventListener('click', stopCarEngineEvents);
  STOP_BUTTON.classList.remove('car__start_active');

  controller.get(carId)?.abort(); // Отменяем запрос на сервер

  const content = await startStopCarEngine('stopped', carId);

  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  START_BUTTON.addEventListener('click', startCarEngineEvents);
  START_BUTTON.classList.add('car__start_active');

  if (content) {
    const animationTime = 0;
    window.requestAnimationFrame(returnCar(CAR, animationTime));
    carReturn.set(carId, false);

    if (Array.from(carReturn.values()).every((val) => val === false)) {
      RACE_BUTTON.addEventListener('click', carsRaceEvent);
      RACE_BUTTON.classList.remove('btn_inactive');
      itFirstCar.value = true;
    }
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

  return ELEMENT;
}

export function createGarage(data: Car[], page: number) {
  const PAGE_CONTAINER = createElement('div', ['page-container'], 'page-garage');
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
  const PAGE_CONTAINER = findDomElement(document.body, '#page-garage');
  const RACE_BUTTON = PAGE_CONTAINER.previousElementSibling?.lastElementChild?.firstElementChild as HTMLButtonElement;
  const RESET_BUTTON = RACE_BUTTON?.nextElementSibling as HTMLButtonElement;
  const carsCollection = PAGE_CONTAINER.querySelectorAll('.car-module') as NodeListOf<HTMLElement>;

  if (getCarsData) {
    PAGE_CONTAINER.replaceWith(createGarage(getCarsData, page));
    itFirstCar.value = true;
  }

  if (RACE_BUTTON?.classList.contains('btn_inactive')) {
    RACE_BUTTON.addEventListener('click', carsRaceEvent);
    RACE_BUTTON.classList.remove('btn_inactive');
  }
  if (!RESET_BUTTON?.classList.contains('btn_inactive')) {
    RESET_BUTTON.removeEventListener('click', carsResetEvent);
    RESET_BUTTON.classList.add('btn_inactive');
  }

  carsCollection.forEach((element) => {
    const carId = +element.id.split('-')[1];
    controller.get(carId)?.abort(); // Отменяем запрос на сервер
  });

  changePaginationGarageStatus();
}
