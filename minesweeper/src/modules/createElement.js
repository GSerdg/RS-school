function createElement(tag, classNameArrow) {
  const ELEM = document.createElement(tag);
  ELEM.classList.add(...classNameArrow);
  return ELEM;
}

export default createElement;
