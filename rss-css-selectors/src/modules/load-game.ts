import { viewLevels } from '../components/level/level';
import { Level } from '../types/types';
import { createNewLevel } from './create-new-level';
import { results, curentLevel } from './level-data';

export function loadGame() {
  if (localStorage.getItem('results') && localStorage.getItem('curentLevel')) {
    const loadResults: (string | null)[] = JSON.parse(localStorage.results);
    const loadCurentLevel: (string | null)[] = JSON.parse(localStorage.curentLevel);
    console.log(loadResults, loadCurentLevel);
    results.forEach((item, index) => {
      results[index] = loadResults[index];
    });
    curentLevel.forEach((item, index) => {
      curentLevel[index] = loadCurentLevel[index];
    });
  }
  console.log(results, curentLevel);
  viewLevels();
  createNewLevel((curentLevel.indexOf('curent') + 1) as Level);
}
