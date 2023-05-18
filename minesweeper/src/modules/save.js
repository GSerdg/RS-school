import settings from './settings';

function saveGame() {
  localStorage.setItem('save', true);
  window.addEventListener('unload', () => {
    const MAIN = document.body.querySelector('.main');
    localStorage.setItem('settings', JSON.stringify(settings));
    localStorage.setItem('main', MAIN.innerHTML);
  });
}

export default saveGame;
