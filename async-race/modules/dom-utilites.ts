export function createElement(tag: string, classNameArrow?: string[], id?: string, text?: string) {
  const ELEM = document.createElement(tag);
  if (classNameArrow) {
    ELEM.classList.add(...classNameArrow);
  }
  if (id) {
    ELEM.setAttribute('id', id);
  }
  if (text) {
    ELEM.innerText = text;
  }
  return ELEM;
}

export function findDomElement<T extends HTMLElement | HTMLTemplateElement | HTMLInputElement | HTMLButtonElement>(
  parentElement: HTMLElement,
  selector: string
) {
  const element = parentElement.querySelector<T>(selector);
  if (element !== null) return element;
  throw new Error(`Selector ${selector} didn't match any elements`);
}
