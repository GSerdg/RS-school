import Car from '../types/types';
import createCar from './create-car';
import createCarModule from './create-car-module';
import createElement from './create-element';
import { BUTTON_TAG, dataObj } from './data';
import findDomElement from './find-dom-element';

async function createCarEvents(event: MouseEvent) {
  const target = event.target as HTMLButtonElement;
  if (target.tagName !== BUTTON_TAG) return;

  const INPUT_COLOR = target.previousElementSibling as HTMLInputElement;
  const INPUT_MODEL = INPUT_COLOR.previousElementSibling as HTMLInputElement;

  if (!INPUT_MODEL.value) return;

  const data: Car = await createCar(INPUT_MODEL.value, INPUT_COLOR.value);
  const CARS = document.body.querySelectorAll('.car-module');
  const HEADER = findDomElement(document.body, '.page__head');
  const BASE_COLOR = '#000000';

  // TODO Проверить необходимость сохранять количество машин в гараже
  dataObj.countGarageCars += 1;

  HEADER.innerText = `Garage(${data.id})`;
  if (CARS.length < 7) {
    const PAGINATION = findDomElement(document.body, '.page__pagination');
    PAGINATION.before(createCarModule(data));
  }
  INPUT_MODEL.value = '';
  INPUT_COLOR.value = BASE_COLOR;
}

export function createPageBtns() {
  const GARAGE_BUTTON = createElement('button', ['btn', 'btn_color'], undefined, 'TO GARAGE');
  const WINNERS_BUTTON = createElement('button', ['btn', 'btn_color'], undefined, 'TO WINNERS');
  const ELEMENT = createElement('div', ['page-buttons']);

  ELEMENT.append(GARAGE_BUTTON, WINNERS_BUTTON);
  return ELEMENT;
}

export function createGarageMenu() {
  const ELEMENT = createElement('div', ['garage-menu']);
  const BUTTONS_CONTAINER = createElement('div', ['btns-contaienr']);
  const BUTTON_RACE = createElement('button', ['btn', 'btn_color'], undefined, 'RACE');
  const BUTTON_RESET = createElement('button', ['btn', 'btn_color'], undefined, 'RESET');
  const BUTTON_GENERATE = createElement('button', ['btn'], undefined, 'GANERATE_CARS');

  for (let i = 0; i < 2; i += 1) {
    let title: string;
    // let func: (event: MouseEvent) => void;
    const func = createCarEvents;

    if (i === 0) {
      title = 'CREATE';
    } else {
      title = 'UPDATE';
    }

    const INPUT_CONTAINER = createElement('div', ['input-container']);
    const INPUT_TEXT = createElement('input', ['input-text']);
    const INPUT_COLOR = createElement('input', ['input-color']);
    const BUTTON = createElement('button', ['btn'], undefined, title);

    INPUT_TEXT.setAttribute('type', 'text');
    INPUT_COLOR.setAttribute('type', 'color');

    INPUT_CONTAINER.append(INPUT_TEXT, INPUT_COLOR, BUTTON);
    ELEMENT.append(INPUT_CONTAINER);

    BUTTON.addEventListener('click', func);
  }

  BUTTONS_CONTAINER.append(BUTTON_RACE, BUTTON_RESET, BUTTON_GENERATE);
  ELEMENT.append(BUTTONS_CONTAINER);

  return ELEMENT;
}
