import { findDomElement } from '../../modules/find-dom-element';
import { Level } from '../../types/types';
import { processUnswer } from '../../modules/process-unswer';
import { getCurrentLevel } from '../../modules/get-current-level';
import './foarm.scss';

export class ViewForm {
  INPUT: HTMLInputElement;
  BUTTON: HTMLElement;
  FOARMS: HTMLElement;

  constructor() {
    this.INPUT = findDomElement<HTMLInputElement>(document.body, '.input');
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
    const inputTag = 'INPUT';
    const target = event.target as HTMLInputElement;
    if (target.tagName !== inputTag) return;
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
    const level = getCurrentLevel<number>();

    if (level > 0) {
      processUnswer(value, level as Level);
    }
  }

  private submitInputPressEnter(event: KeyboardEvent) {
    const target = event.target as HTMLInputElement;
    let value: string;
    const level = getCurrentLevel<number>();

    if (level > 0) {
      if (event.code === 'Enter') {
        value = target.value;
        processUnswer(value, level as Level);
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
