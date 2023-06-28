import { Level, Tag } from '../types/types';
import { createElement } from './create-element';
import { curentLevel, levelData } from './level-data';

let counter = 0;

function getElementFromData(data: Tag[], id: number) {
  let dataElement: Tag | undefined;

  for (let i = 0; i < data.length; i += 1) {
    counter += 1;
    if (counter === id) return data[i];
    if (data[i].inside) {
      dataElement = getElementFromData(data[i].inside as Tag[], id);
      if (dataElement) {
        break;
      }
    }
  }
  return dataElement;
}

export function createClue(element: HTMLElement) {
  const id = element.id.match(/\d+/);
  const level = (curentLevel.indexOf('curent') + 1) as Level;
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
