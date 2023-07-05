import { createLevelsElement } from '../../modules/create-levels';
import { createElement } from '../../modules/create-element';
import { levelData, levelUnswer, results } from '../../modules/level-data';
import { findDomElement } from '../../modules/find-dom-element';
import { createNewLevel } from '../../modules/create-new-level';
import { Level } from '../../types/types';
import { removeLevel } from '../../modules/remove-level';
import { curentLevel } from '../../modules/level-data';
import { deleteInputText } from '../../modules/delete-input-text';
import { getCurrentLevel } from '../../modules/get-current-level';
import './level.scss';

export class ViewLevels {
  HEADER: HTMLElement;
  RESET_BTN: HTMLElement;
  HELP_BTN: HTMLElement;
  LEVELS_LIST: HTMLElement;
  RIGHT_FIELD: HTMLElement;
  btnTag: string;
  liTag: string;

  constructor() {
    this.HEADER = createElement('h2', ['right-field__title'], undefined, 'Level');
    this.RESET_BTN = createElement('button', ['btn'], undefined, 'Reset progress');
    this.HELP_BTN = createElement('button', ['btn'], undefined, 'Help');
    this.LEVELS_LIST = createLevelsElement(levelData);
    this.RIGHT_FIELD = findDomElement(document.body, '.right-field');
    this.btnTag = 'BUTTON';
    this.liTag = 'LI';

    this.constructElement();
  }

  private async addText(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.tagName !== this.btnTag) return;

    const INPUT = findDomElement<HTMLInputElement>(document.body, '.input');
    const LEVEL = document.body.querySelector('.levels__list_light');
    const currLevel = getCurrentLevel<Level>();

    if (currLevel > 0) {
      const unswer = levelUnswer[currLevel][0];

      INPUT.value = '';

      for (const value of unswer) {
        const promise = new Promise(function (res) {
          setTimeout(() => {
            res('');
          }, 100);
        });
        await promise;
        INPUT.value += value;
      }
      results[currLevel - 1] = 'help';
    }

    LEVEL?.classList.add('levels__list_help');
    INPUT.focus();
  }

  private resetLevelList(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.tagName !== this.btnTag) return;

    const LEVEL = this.LEVELS_LIST.querySelector('.levels__list_light') as HTMLElement | null;

    Array.from(this.LEVELS_LIST.children).forEach((item) => {
      item.classList.remove(...['levels__list_help', 'levels__list_win']);
    });
    results.fill(null);
    curentLevel.fill(null)[0] = 'curent';
    removeLevel();
    createNewLevel(1);
    LEVEL?.classList.remove('levels__list_light');
    this.LEVELS_LIST.firstElementChild?.classList.add('levels__list_light');
  }

  private loadLevel(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.tagName !== this.liTag) return;

    const id = +target.id as Level;
    const LEVEL_BEFORE = document.body.querySelector('.levels__list_light');

    LEVEL_BEFORE?.classList.remove('levels__list_light');
    target.classList.add('levels__list_light');
    curentLevel[getCurrentLevel<Level>() - 1] = null;

    removeLevel();
    createNewLevel(id);
    deleteInputText();
  }

  private constructElement() {
    this.RIGHT_FIELD.append(this.HEADER, this.LEVELS_LIST, this.RESET_BTN, this.HELP_BTN);

    this.LEVELS_LIST.addEventListener('click', this.loadLevel.bind(this));
    this.RESET_BTN.addEventListener('click', this.resetLevelList.bind(this));
    this.HELP_BTN.addEventListener('click', this.addText.bind(this));
  }
}
