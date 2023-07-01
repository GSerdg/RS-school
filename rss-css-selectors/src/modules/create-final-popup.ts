import { createElement } from './create-element';

function closeFinalPopup(event: MouseEvent) {
  const target = event.target as HTMLElement;
  if (target.tagName !== 'BUTTON') return;

  document.body.style.paddingRight = ``;
  document.body.style.overflow = ``;
  target.parentElement?.parentElement?.remove();
}

export function createFinalPopup() {
  const POPUP = createElement('div', ['final-popup']);
  const POPUP_WINDOW = createElement('div', ['final-popup__window']);
  const TITLE = createElement('p', ['final-popup__title'], undefined, 'All levels is finished');
  const BUTTON = createElement('button', ['btn'], undefined, 'Ok');
  // Для компенсации скролла
  const width = window.innerWidth;
  const scroll = width - document.body.clientWidth;

  document.body.style.paddingRight = `${scroll}px`;
  document.body.style.overflow = `hidden`;

  POPUP_WINDOW.append(TITLE, BUTTON);
  POPUP.append(POPUP_WINDOW);

  BUTTON.addEventListener('click', closeFinalPopup);

  return POPUP;
}
