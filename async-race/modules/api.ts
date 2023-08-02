import { Car, Engine, OrderBy, SortBy, EngineStatus, Success, Winner } from '../types/types';
import { controller, dataObj, resultObj } from './data';

const PATHS = {
  BASE_URL: 'http://127.0.0.1:3000',
  GARAGE: '/garage',
  ENGINE: '/engine',
  WINNERS: '/winners',
};

export async function createCar(carModel: string, carColor: string): Promise<Car> {
  const response = await fetch(`${PATHS.BASE_URL}${PATHS.GARAGE}`, {
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

export async function getCar(id: number): Promise<Car | undefined> {
  try {
    const response = await fetch(`${PATHS.BASE_URL}${PATHS.GARAGE}/${id}`);

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

export async function getCars(page: number, limit: number): Promise<Car[] | undefined> {
  try {
    const response = await fetch(`${PATHS.BASE_URL}${PATHS.GARAGE}?_page=${page}&_limit=${limit}`);
    const data: Car[] = await response.json();
    const header = response.headers.get('X-Total-Count');

    if (header) {
      dataObj.count = +header;
    }

    return data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

export async function updateCar(carModel: string, carColor: string, id: number): Promise<Car | undefined> {
  try {
    const response = await fetch(`${PATHS.BASE_URL}${PATHS.GARAGE}/${id}`, {
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

export async function deleteCar(id: number): Promise<void> {
  try {
    const response = await fetch(`${PATHS.BASE_URL}${PATHS.GARAGE}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Car width id: ${id} not found in server`);
    }
  } catch (error) {
    console.error(error);
  }
}

export async function startStopCarEngine(status: EngineStatus, id: number): Promise<Engine | undefined> {
  try {
    const response = await fetch(`${PATHS.BASE_URL}${PATHS.ENGINE}?id=${id}&status=${status}`, {
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

export async function driveCarEngine(id: number): Promise<Success> {
  controller.set(id, new AbortController());
  const response = await fetch(`${PATHS.BASE_URL}${PATHS.ENGINE}?id=${id}&status=drive`, {
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

export async function getResults(
  page: number,
  limit: number,
  sort?: SortBy,
  order?: OrderBy
): Promise<Winner[] | undefined> {
  try {
    let response: Response;

    if (sort && order) {
      response = await fetch(
        `${PATHS.BASE_URL}${PATHS.WINNERS}?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`
      );
    } else {
      response = await fetch(`${PATHS.BASE_URL}${PATHS.WINNERS}?_page=${page}&_limit=${limit}`);
    }

    const data: Winner[] = await response.json();
    const header = response.headers.get('X-Total-Count');

    if (header) {
      resultObj.count = +header;
    }

    return data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

export async function getResult(id: number): Promise<Winner | undefined> {
  try {
    const response = await fetch(`${PATHS.BASE_URL}${PATHS.WINNERS}/${id}`);
    const data: Winner = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

export async function deleteWinner(id: number): Promise<void> {
  try {
    const response = await fetch(`${PATHS.BASE_URL}${PATHS.WINNERS}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Car width id: ${id} not found in server`);
    }
  } catch (error) {
    /* empty */
  }
}

export async function createWinner(id: number, wins: number, time: number): Promise<Winner> {
  const response = await fetch(`${PATHS.BASE_URL}${PATHS.WINNERS}`, {
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

export async function updateWinner(id: number, wins: number, time: number): Promise<Winner | undefined> {
  try {
    const response = await fetch(`${PATHS.BASE_URL}${PATHS.WINNERS}/${id}`, {
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
