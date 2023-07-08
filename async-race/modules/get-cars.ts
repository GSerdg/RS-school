import Car from '../types/types';

export default async function getCars() {
  const url = 'http://127.0.0.1:3000/garage';
  const response = await fetch(url);
  const data: Car[] = await response.json();

  return data;
}
