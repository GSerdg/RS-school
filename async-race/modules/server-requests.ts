import Car from '../types/types';

const path = {
  domen: 'http://127.0.0.1:3000',
  url: '/garage',
};

export async function createCar(carModel: string, carColor: string) {
  // const url = 'http://127.0.0.1:3000/garage';
  const response = await fetch(`${path.domen}${path.url}`, {
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
    const response = await fetch(`${path.domen}${path.url}/${id}`);

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

export async function getCars() {
  try {
    // const url = 'http://127.0.0.1:3000/garage';
    const response = await fetch(`${path.domen}${path.url}`);
    const data: Car[] = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

export async function updateCar(carModel: string, carColor: string, id: number) {
  try {
    // const url = `http://127.0.0.1:3000/garage/${id}`;
    const response = await fetch(`${path.domen}${path.url}/${id}`, {
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
    const response = await fetch(`${path.domen}${path.url}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Car width id: ${id} not found in server`);
    }

    // const data: Car = await response.json();

    // return data;
  } catch (error) {
    console.error(error);
    // return undefined;
  }
}
