import { Car, Engine, Order, Sort, Status, Success, Winner } from '../types/types';
import { controller, dataObj, resultObj } from './data';

const path = {
  domen: 'http://127.0.0.1:3000',
  urlGarage: '/garage',
  urlEngine: '/engine',
  urlWinners: '/winners',
};

export async function createCar(carModel: string, carColor: string) {
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
  controller.set(id, new AbortController());
  const response = await fetch(`${path.domen}${path.urlEngine}?id=${id}&status=drive`, {
    method: 'PATCH',
    signal: controller.get(id)?.signal,
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }

  const data: Success = await response.json();

  return data;
}

export async function getResults(page: number, limit: number, sort?: Sort, order?: Order) {
  try {
    let response: Response;

    if (sort && order) {
      response = await fetch(
        `${path.domen}${path.urlWinners}?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`
      );
    } else {
      response = await fetch(`${path.domen}${path.urlWinners}?_page=${page}&_limit=${limit}`);
    }

    const data: Winner[] = await response.json();
    const header = response.headers.get('X-Total-Count');

    if (header) {
      resultObj.countWinnerCars = +header;
    }

    return data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

export async function getResult(id: number) {
  try {
    const response = await fetch(`${path.domen}${path.urlWinners}/${id}`);
    const data: Winner = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

export async function deleteWinner(id: number) {
  try {
    const response = await fetch(`${path.domen}${path.urlWinners}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Car width id: ${id} not found in server`);
    }
  } catch (error) {
    /* empty */
  }
}

export async function createWinner(id: number, wins: number, time: number) {
  const response = await fetch(`${path.domen}${path.urlWinners}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id,
      wins,
      time,
    }),
  });
  const data: Winner = await response.json();

  return data;
}

export async function updateWinner(id: number, wins: number, time: number) {
  try {
    const response = await fetch(`${path.domen}${path.urlWinners}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        wins,
        time,
      }),
    });

    const data: Winner = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}
