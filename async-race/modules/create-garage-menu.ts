import createElement from './create-element';

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
  }

  BUTTONS_CONTAINER.append(BUTTON_RACE, BUTTON_RESET, BUTTON_GENERATE);
  ELEMENT.append(BUTTONS_CONTAINER);

  return ELEMENT;
}
