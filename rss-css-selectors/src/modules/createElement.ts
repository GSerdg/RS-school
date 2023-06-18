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
