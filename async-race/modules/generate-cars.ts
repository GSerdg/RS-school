import Car from '../types/types';
import { createCar } from './server-requests';
import { CARS_ON_PAGE, dataObj } from './data';
import { replasePage } from './app-utilites';
import { findDomElement } from './dom-utilites';

export default async function generateCars(number: number) {
  async function applyPromise(rez: Car[]) {
    const CARS = document.body.querySelectorAll('.car-module');
    const HEADER = findDomElement(document.body, '.page__head');

    rez.sort((a: Car, b: Car) => a.id - b.id);
    const lastCar = rez.at(-1);

    if (CARS.length < CARS_ON_PAGE) {
      replasePage(dataObj.page);
    }

    if (lastCar) {
      HEADER.innerText = `Garage(${lastCar.id})`;
    }
  }

  const carBrand = ['Toyota', 'Nissan', 'Daihatsu', 'Subaru', 'BMV', 'Mersedes', 'Ford', 'Honda', 'Kia', 'Renault'];
  const carModel = ['Opa', 'Corolla', 'Murano', 'Note', 'Avensis', 'Voxy', 'Fit', 'Legend', 'Shuttle', 'Odyssey'];
  const promiseArray: Promise<Car>[] = [];

  for (let i = 0; i < number; i += 1) {
    const promise = new Promise<Car>((resolve) => {
      const NUMBER_VARIANTS = 10;
      const FFFFFF_DEC = 16777215;

      const randomBrand = Math.floor(Math.random() * NUMBER_VARIANTS);
      const randomModel = Math.floor(Math.random() * NUMBER_VARIANTS);
      const carStr = `${carBrand[randomBrand]} ${carModel[randomModel]}`;
      const carColor = `#${Math.floor(Math.random() * FFFFFF_DEC).toString(16)}`;

      resolve(createCar(carStr, carColor));
    });

    promiseArray.push(promise);
  }

  await Promise.all(promiseArray).then(applyPromise);
}
