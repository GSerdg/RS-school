const BUTTON_TAG = 'BUTTON';
const SPAN_TAG = 'SPAN';
const carReturn = new Map<number, boolean>();
const controller = new Map<number, AbortController>();

const itFirstCar = {
  value: true,
};

const dataObj = {
  page: 1,
  limit: 7,
  countGarageCars: 0,
};

const resultObj = {
  page: 1,
  limit: 10,
};

export { BUTTON_TAG, SPAN_TAG, dataObj, carReturn, controller, itFirstCar, resultObj };
