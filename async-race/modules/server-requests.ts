import { Car, Engine, Status, Success } from '../types/types';
import { dataObj } from './data';

const path = {
  domen: 'http://127.0.0.1:3000',
  urlGarage: '/garage',
  urlEngine: '/engine',
};

export async function createCar(carModel: string, carColor: string) {
  // const url = 'http://127.0.0.1:3000/garage';
  const response = await fetch(`${path.domen}${path.urlGarage}`, {
    method: 'POST',
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

export async function getCar(id: number) {
  try {
    // const url = `http://127.0.0.1:3000/garage/${id}`;
    const response = await fetch(`${path.domen}${path.urlGarage}/${id}`);

    if (!response.ok) {
      throw new Error(`Car width id: ${id} not found in server`);
    }

    const data: Car = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

export async function getCars(page: number, limit: number) {
  try {
    // const url = 'http://127.0.0.1:3000/garage';
    const response = await fetch(`${path.domen}${path.urlGarage}?_page=${page}&_limit=${limit}`);
    const data: Car[] = await response.json();
    const header = response.headers.get('X-Total-Count');

    if (header) {
      dataObj.countGarageCars = +header;
    }

    return data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

export async function updateCar(carModel: string, carColor: string, id: number) {
  try {
    // const url = `http://127.0.0.1:3000/garage/${id}`;
    const response = await fetch(`${path.domen}${path.urlGarage}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: carModel,
        color: carColor,
      }),
    });

    if (!response.ok) {
      throw new Error(`Car width id: ${id} not found in server`);
    }

    const data: Car = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

export async function deleteCar(id: number) {
  try {
    // const url = `http://127.0.0.1:3000/garage/${id}`;
    const response = await fetch(`${path.domen}${path.urlGarage}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Car width id: ${id} not found in server`);
    }
  } catch (error) {
    console.error(error);
  }
}

export async function startStopCarEngine(status: Status, id: number) {
  try {
    const response = await fetch(`${path.domen}${path.urlEngine}?id=${id}&status=${status}`, {
      method: 'PATCH',
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    const data: Engine = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

export async function driveCarEngine(id: number) {
  // try {
  // const stopCarError = "Car has been stopped suddenly. It's engine was broken down";
  const response = await fetch(`${path.domen}${path.urlEngine}?id=${id}&status=drive`, {
    method: 'PATCH',
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }
  // startCar(id); // TODO Функция, которая запускает машину

  const data: Success = await response.json();

  return data;
  // } catch (err) {
  // console.error(err);
  // return undefined;
  // }
}
