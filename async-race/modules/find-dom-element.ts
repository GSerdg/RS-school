export function findDomElement<T extends HTMLElement | HTMLTemplateElement | HTMLInputElement>(
  parentElement: HTMLElement,
  selector: string
) {
  const element = parentElement.querySelector<T>(selector);
  if (element !== null) return element;
  throw new Error(`Selector ${selector} didn't match any elements`);
}
