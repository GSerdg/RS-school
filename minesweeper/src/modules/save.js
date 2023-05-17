import settings from './settings';

function saveGame() {
  localStorage.setItem('save', true);
  window.addEventListener('unload', () => {
    const SAVE_FIELD_WRAPPER = document.body.querySelector('.field__wrapper');
    localStorage.setItem('settings', JSON.stringify(settings));
    localStorage.setItem('table', SAVE_FIELD_WRAPPER.parentNode.innerHTML);
  });
}

export default saveGame;
