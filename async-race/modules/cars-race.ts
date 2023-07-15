// eslint-disable-next-line import/no-cycle
import { startCar, stopCar } from './create-garage';
import { BUTTON_TAG } from './data';
import { findDomElement } from './dom-utilites';

export function carsResetEvent(event: MouseEvent) {
  const target = event.target as HTMLButtonElement;
  if (target.tagName !== BUTTON_TAG) return;

  const WINNER_POPUP = document.body.querySelector('.winner-popup');
  const carsCollection = document.body.querySelectorAll('.car-module') as NodeListOf<HTMLElement>;

  WINNER_POPUP?.remove();
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  carsReset(carsCollection);
}

export async function carsRace(carModules: NodeListOf<HTMLElement>) {
  const promiseArray: Promise<void>[] = [];
  const BUTTON_RESET = findDomElement<HTMLButtonElement>(document.body, '#reset');

  for (let i = 0; i < carModules.length; i += 1) {
    const promise = new Promise<void>((resolve) => {
      resolve(startCar(carModules[i], true));
    });

    promiseArray.push(promise);
  }
  await Promise.all(promiseArray).then().catch(console.error);

  BUTTON_RESET.addEventListener('click', carsResetEvent);
  BUTTON_RESET.classList.remove('btn_inactive');
}

export async function carsReset(carModules: NodeListOf<HTMLElement>) {
  const promiseArray: Promise<void>[] = [];
  const BUTTON_RESET = findDomElement<HTMLButtonElement>(document.body, '#reset');

  BUTTON_RESET.removeEventListener('click', carsResetEvent);
  BUTTON_RESET.classList.add('btn_inactive');

  for (let i = 0; i < carModules.length; i += 1) {
    const promise = new Promise<void>((resolve) => {
      resolve(stopCar(carModules[i]));
    });

    promiseArray.push(promise);
  }
  await Promise.all(promiseArray).then().catch(console.error);
}
