import './sources.css';
import { SourcesApiData, NotNullElement } from '../../../types/index';

class Sources extends NotNullElement {
  draw(data: SourcesApiData[]) {
    const fragment = document.createDocumentFragment();
    const sourceItemTemp = this.findNotNullElement(document.body, '#sourceItemTemp') as HTMLTemplateElement;

    data.forEach((item) => {
      const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLElement;

      this.findNotNullElement(sourceClone, '.source__item-name').textContent = item.name;
      this.findNotNullElement(sourceClone, '.source__item').setAttribute('data-source-id', item.id);

      fragment.append(sourceClone);
    });

    this.findNotNullElement(document.body, '.sources').append(fragment);
  }
}

export default Sources;
