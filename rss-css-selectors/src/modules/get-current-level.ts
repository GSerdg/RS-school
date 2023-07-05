import { Level } from '../types/types';
import { curentLevel } from './level-data';

export function getCurrentLevel<T extends number | Level>() {
  return (curentLevel.indexOf('curent') + 1) as T;
}
