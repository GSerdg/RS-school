import { dataObj, resultObj } from './data';
import { findDomElement } from './dom-utilites';

export function changePaginationGarageStatus(prev?: HTMLElement, next?: HTMLElement) {
  const PREV_BUTTON = prev || findDomElement(document.body, '#prev-btn');
  const NEXT_BUTTON = next || findDomElement(document.body, '#next-btn');
  const FIRST_PAGE = 1;

  if (dataObj.page === FIRST_PAGE) {
    PREV_BUTTON.classList.add('btn_inactive');
  } else {
    PREV_BUTTON.classList.remove('btn_inactive');
  }
  if (dataObj.limit * dataObj.page >= dataObj.count) {
    NEXT_BUTTON.classList.add('btn_inactive');
  } else {
    NEXT_BUTTON.classList.remove('btn_inactive');
  }
}

export function changePaginationResultStatus(prev?: HTMLElement, next?: HTMLElement) {
  const PREV_BUTTON = prev || findDomElement(document.body, '#prev-btn');
  const NEXT_BUTTON = next || findDomElement(document.body, '#next-btn');
  const FIRST_PAGE = 1;

  if (resultObj.page === FIRST_PAGE) {
    PREV_BUTTON.classList.add('btn_inactive');
  } else {
    PREV_BUTTON.classList.remove('btn_inactive');
  }
  if (resultObj.limit * resultObj.page >= resultObj.count) {
    NEXT_BUTTON.classList.add('btn_inactive');
  } else {
    NEXT_BUTTON.classList.remove('btn_inactive');
  }
}

export function animateMoveCar(carElement: HTMLElement, carModule: HTMLElement, time: number) {
  return () => {
    const carWidth = 40;
    const width = carModule.clientWidth - carWidth;
    // eslint-disable-next-line no-param-reassign
    carElement.style.transitionDuration = `${time}ms`;
    // eslint-disable-next-line no-param-reassign
    carElement.style.transform = `translateX(${width}px)`;
  };
}

export function stopAnimateCar(carElement: HTMLElement) {
  return () => {
    const padding = 10;
    const position = carElement.getBoundingClientRect().left - padding;
    // eslint-disable-next-line no-param-reassign
    carElement.style.transform = `translateX(${position}px)`;
  };
}

export function returnCar(carElement: HTMLElement, time: number) {
  return () => {
    const position = 0;
    // eslint-disable-next-line no-param-reassign
    carElement.style.transitionDuration = `${time}ms`;
    // eslint-disable-next-line no-param-reassign
    carElement.style.transform = `translateX(${position}px)`;
  };
}
