import { results, curentLevel } from './level-data';

export function saveGame() {
  window.addEventListener('unload', () => {
    localStorage.setItem('results', JSON.stringify(results));
    localStorage.setItem('curentLevel', JSON.stringify(curentLevel));
  });
}
