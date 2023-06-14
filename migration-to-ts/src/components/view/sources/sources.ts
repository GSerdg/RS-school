import './sources.css';
import { SourcesApiData } from '../../../types/index';
import { findDomElement } from '../../../helper/find-dom-element';

class Sources {
  draw(data: Readonly<SourcesApiData[]>) {
    const fragment = document.createDocumentFragment();
    const sourceItemTemp = findDomElement<HTMLTemplateElement>(document.body, '#sourceItemTemp');

    data.forEach((item) => {
      const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLElement;

      findDomElement<HTMLElement>(sourceClone, '.source__item-name').textContent = item.name;
      findDomElement<HTMLElement>(sourceClone, '.source__item').setAttribute('data-source-id', item.id);

      fragment.append(sourceClone);
    });

    findDomElement<HTMLElement>(document.body, '.sources').append(fragment);
  }
}

export default Sources;
