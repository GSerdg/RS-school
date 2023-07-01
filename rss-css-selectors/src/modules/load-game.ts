import { ViewForm } from '../components/foarm/foarm';
import { ViewLevels } from '../components/level/level';
import { Level } from '../types/types';
import { createNewLevel } from './create-new-level';
import { results, curentLevel } from './level-data';

export function loadGame() {
  if (localStorage.getItem('results') && localStorage.getItem('curentLevel')) {
    const loadResults: (string | null)[] = JSON.parse(localStorage.results);
    const loadCurentLevel: (string | null)[] = JSON.parse(localStorage.curentLevel);

    results.forEach((item, index) => {
      results[index] = loadResults[index];
    });
    curentLevel.forEach((item, index) => {
      curentLevel[index] = loadCurentLevel[index];
    });
  }

  new ViewForm();
  new ViewLevels();
  createNewLevel((curentLevel.indexOf('curent') + 1) as Level);
}
