export default async function createCar(carModel: string, carColor: string) {
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
  const data = response.json();
  return data;
}
