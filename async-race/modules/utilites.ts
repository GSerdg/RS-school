import createGarage from './create-garage';
import findDomElement from './find-dom-element';
import getCars from './get-cars';

export default async function replasePage(page: number) {
  const getCarsData = await getCars();
  const PAGE_CONTAINER = findDomElement(document.body, '.page-container');
  PAGE_CONTAINER.replaceWith(createGarage(getCarsData, page));
}
