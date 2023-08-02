import { createElement } from './dom-utilites';
import { getCar } from './api';

export default async function createWinnerPopup(id: number, time: number) {
  let title: string;
  const ELEMENT = createElement('div', ['winner-popup']);
  const data = await getCar(id);
  if (data) {
    title = `${data.name} went first\n[${time}s]`;
    const TITLE = createElement('p', ['popup_title'], undefined, title);
    ELEMENT.append(TITLE);
  }

  return ELEMENT;
}
