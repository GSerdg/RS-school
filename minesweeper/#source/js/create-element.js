function createElement(tag, classNameArray) {
  const ELEM = document.createElement(tag);
  ELEM.classList.add(...classNameArray);
  return ELEM;
}
export default createElement;
