import { createCar } from './server-requests';
import { BUTTON_TAG, dataObj } from './data';
import { createElement, findDomElement } from './dom-utilites';
import { changePaginationGarageStatus } from './app-utilites';
// eslint-disable-next-line import/no-cycle
import generateCars from './generate-cars';
// eslint-disable-next-line import/no-cycle
import { createCarModule } from './create-garage';
// eslint-disable-next-line import/no-cycle
import { carsRace } from './cars-race';

export function carsRaceEvent(event: MouseEvent) {
  const target = event.target as HTMLButtonElement;
  if (target.tagName !== BUTTON_TAG) return;

  const carsCollection = document.body.querySelectorAll('.car-module') as NodeListOf<HTMLElement>;
  carsRace(carsCollection);
}

async function createCarEvents(event: MouseEvent) {
  const target = event.target as HTMLButtonElement;
  if (target.tagName !== BUTTON_TAG) return;

  const INPUT_COLOR = target.previousElementSibling as HTMLInputElement;
  const INPUT_MODEL = INPUT_COLOR.previousElementSibling as HTMLInputElement;

  if (!INPUT_MODEL.value) return;

  const data = await createCar(INPUT_MODEL.value, INPUT_COLOR.value).catch((err) => console.error(err));
  const CARS = document.body.querySelectorAll('.car-module');
  const HEADER = findDomElement(document.body, '.page__head');
  const BASE_COLOR = '#000000';

  dataObj.countGarageCars += 1;

  HEADER.innerText = `Garage(${dataObj.countGarageCars})`;
  if (CARS.length < dataObj.limit) {
    const GARAGE = findDomElement(document.body, '#page-garage');
    if (data) {
      GARAGE.append(createCarModule(data));
    }
  } else {
    changePaginationGarageStatus();
  }
  INPUT_MODEL.value = '';
  INPUT_COLOR.value = BASE_COLOR;
}

async function generateCarsEvent(event: MouseEvent) {
  const target = event.target as HTMLButtonElement;
  if (target.tagName !== BUTTON_TAG) return;

  await generateCars(100);
}

export function createGarageMenu() {
  const ELEMENT = createElement('div', ['garage-menu']);
  const BUTTONS_CONTAINER = createElement('div', ['btns-contaienr']);
  const BUTTON_RACE = createElement('button', ['btn', 'btn_color'], 'race', 'RACE');
  const BUTTON_RESET = createElement('button', ['btn', 'btn_color', 'btn_inactive'], 'reset', 'RESET');
  const BUTTON_GENERATE = createElement('button', ['btn'], undefined, 'GENERATE_CARS');

  for (let i = 0; i < 2; i += 1) {
    let title: string;
    let btnClassList: string[];
    let inputClassList: string[];
    let idInputContainer: string;
    let flag: boolean;

    if (i === 0) {
      title = 'CREATE';
      btnClassList = ['btn'];
      inputClassList = ['input-text'];
      idInputContainer = 'input-create';
      flag = true;
    } else {
      title = 'UPDATE';
      btnClassList = ['btn', 'btn_inactive'];
      inputClassList = ['input-text', 'input-text_inactive'];
      idInputContainer = 'input-update';
      flag = false;
    }

    const INPUT_CONTAINER = createElement('div', ['input-container'], idInputContainer);
    const INPUT_TEXT = createElement('input', inputClassList);
    const INPUT_COLOR = createElement('input', ['input-color']);
    const BUTTON = createElement('button', btnClassList, undefined, title);

    INPUT_TEXT.setAttribute('type', 'text');
    INPUT_COLOR.setAttribute('type', 'color');
    INPUT_CONTAINER.append(INPUT_TEXT, INPUT_COLOR, BUTTON);
    ELEMENT.append(INPUT_CONTAINER);

    if (flag) {
      BUTTON.addEventListener('click', createCarEvents);
    }
  }

  BUTTONS_CONTAINER.append(BUTTON_RACE, BUTTON_RESET, BUTTON_GENERATE);
  ELEMENT.append(BUTTONS_CONTAINER);
  BUTTON_GENERATE.addEventListener('click', generateCarsEvent);
  BUTTON_RACE.addEventListener('click', carsRaceEvent);

  return ELEMENT;
}
