import './foarm.scss';
import { findDomElement } from '../../modules/find-dom-element';
import { curentLevel } from '../../modules/level-data';
import { Level } from '../../types/types';
import { checkUnswer } from '../../modules/check-unswer';

export class ViewForm {
  INPUT: HTMLInputElement;
  BUTTON: HTMLElement;
  FOARMS: HTMLElement;

  constructor() {
    this.INPUT = findDomElement(document.body, '.input') as HTMLInputElement;
    this.BUTTON = findDomElement(document.body, '.btn');
    this.FOARMS = findDomElement(document.body, '.foarms');

    this.addEvents();
  }

  private deleteAnimationClass(event: Event) {
    const target = event.target as HTMLDivElement;
    if (target.classList[0] !== 'foarms') return;
    target.classList.remove('foarms_animation');
  }

  private addRemoveInputStrobe(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.tagName !== 'INPUT') return;
    if (target.value.length > 0) {
      target.classList.remove('input_strobe');
    } else {
      target.classList.add('input_strobe');
    }
  }

  private submitInputClickButton(event: Event) {
    const target = event.target as HTMLElement;
    const input = target.previousElementSibling as HTMLInputElement;
    const value = input?.value;
    const level = curentLevel.indexOf('curent') + 1;
    if (level > 0) {
      checkUnswer(value, level as Level);
    }
  }

  private submitInputPressEnter(event: Event) {
    const target = event.target as HTMLInputElement;
    let value: string;
    const level = curentLevel.indexOf('curent') + 1;

    if (level > 0) {
      if ((event as KeyboardEvent).code === 'Enter') {
        value = target.value;
        checkUnswer(value, level as Level);
      }
    }
  }

  private addEvents() {
    this.INPUT.addEventListener('input', this.addRemoveInputStrobe);
    this.INPUT.addEventListener('keyup', this.submitInputPressEnter);
    this.BUTTON.addEventListener('click', this.submitInputClickButton);
    this.FOARMS.addEventListener('animationend', this.deleteAnimationClass);
  }
}
