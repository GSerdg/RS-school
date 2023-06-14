export function findDomElement<T extends HTMLElement | HTMLTemplateElement>(node: HTMLElement, selector: string) {
  const element = node.querySelector<T>(selector);
  if (element !== null) return element;
  throw new Error();
}
