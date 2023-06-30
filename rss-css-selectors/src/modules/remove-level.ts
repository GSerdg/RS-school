export function removeLevel() {
  const TEXT_FOARM_CODE = document.body.querySelector('.text-foarm__code');
  const ANIMATION_ELEMENTS = document.body.querySelector('.animation__elements');

  TEXT_FOARM_CODE?.remove();
  ANIMATION_ELEMENTS?.remove();
}
