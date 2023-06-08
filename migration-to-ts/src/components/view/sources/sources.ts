import './sources.css';
import { SourcesApiData, findNotNullElement } from '../../../types/index';

class Sources {
  draw(data: SourcesApiData[]) {
    const fragment = document.createDocumentFragment();
    const sourceItemTemp = findNotNullElement(document.body, '#sourceItemTemp') as HTMLTemplateElement;

    data.forEach((item) => {
      const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLElement;

      findNotNullElement(sourceClone, '.source__item-name').textContent = item.name;
      findNotNullElement(sourceClone, '.source__item').setAttribute('data-source-id', item.id);

      fragment.append(sourceClone);
    });

    findNotNullElement(document.body, '.sources').append(fragment);
  }
}

export default Sources;
