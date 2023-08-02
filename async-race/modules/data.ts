import { PageData, SortObject } from '../types/types';

const BUTTON_TAG = 'BUTTON';
const SPAN_TAG = 'SPAN';
const carReturn = new Map<number, boolean>();
const controller = new Map<number, AbortController>();

const isFirstCar = {
  value: true,
};

const dataPageGarage: PageData = {
  page: 1,
  limit: 7,
  count: 0,
};

const dataPageResult: PageData = {
  page: 1,
  limit: 10,
  count: 0,
};

const sortObj: SortObject = {
  sortBy: undefined,
  orderBy: undefined,
};

export {
  BUTTON_TAG,
  SPAN_TAG,
  dataPageGarage as dataObj,
  carReturn,
  controller,
  isFirstCar as itFirstCar,
  dataPageResult as resultObj,
  sortObj,
};
