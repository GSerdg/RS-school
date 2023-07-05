import { Level, Tag } from '../types/types';
import { createElement } from './create-element';
import { getCurrentLevel } from './get-current-level';
import { levelData } from './level-data';

let counter = 0;

function getElementFromData(data: Tag[], id: number) {
  let dataElement: Tag | undefined;

  for (const item of data) {
    counter += 1;
    if (counter === id) return item;
    if (item.inside) {
      dataElement = getElementFromData(item.inside as Tag[], id);
      if (dataElement) {
        break;
      }
    }
  }
  return dataElement;
}

export function createClue(element: HTMLElement) {
  const id = element.id.match(/\d+/);
  const level = getCurrentLevel<Level>();
  let data: Tag | undefined;
  let htmlTag = '<';

  if (id) {
    data = getElementFromData(levelData[level], +id[0]);
    counter = 0;
  }
  if (data) {
    htmlTag += `${data.value} `;
    if (data.id) htmlTag += `id="${data.id}" `;
    if (data.class) htmlTag += `class="${data.class}" `;
    if (data.inside) {
      htmlTag += `></${data.value}>`;
    } else {
      htmlTag += `/>`;
    }
  }

  const POPUP = createElement('div', ['popup'], undefined, htmlTag);

  return POPUP;
}
