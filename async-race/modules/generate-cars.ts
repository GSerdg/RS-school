import { Car } from '../types/types';
import { createCar } from './server-requests';
import { dataObj } from './data';
import { replasePage } from './create-garage';

export default async function generateCars(number: number) {
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

  await Promise.all(promiseArray)
    .then(() => replasePage(dataObj.page))
    .catch(console.error);
}
