import Car from '../types/types';

export async function createCar(carModel: string, carColor: string) {
  const url = 'http://127.0.0.1:3000/garage';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: carModel,
      color: carColor,
    }),
  });
  const data: Promise<Car> = response.json();
  return data;
}

export async function getCar(id: number) {
  const url = `http://127.0.0.1:3000/garage/${id}`;
  const response = await fetch(url);
  const data: Car = await response.json();

  return data;
}

export async function getCars() {
  const url = 'http://127.0.0.1:3000/garage';
  const response = await fetch(url);
  const data: Car[] = await response.json();

  return data;
}

export async function updateCar(carModel: string, carColor: string, id: number) {
  const url = `http://127.0.0.1:3000/garage/${id}`;
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: carModel,
      color: carColor,
    }),
  });
  const data: Car = await response.json();
  return data;
}
