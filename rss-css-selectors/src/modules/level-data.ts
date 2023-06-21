import { Levels } from '../types/types';

export const level = 2;
export const levelData: Levels = {
  1: [
    {
      value: 'apple',
      class: null,
      id: null,
      inside: [
        {
          value: 'caterpillar',
          class: 'angry',
          id: null,
          inside: null,
        },
      ],
    },
    {
      value: 'apple',
      class: null,
      id: 'big',
      inside: [
        {
          value: 'butterfly',
          class: null,
          id: null,
          inside: null,
        },
      ],
    },
    {
      value: 'flower',
      class: null,
      id: null,
      inside: [
        {
          value: 'butterfly',
          class: null,
          id: null,
          inside: null,
        },
      ],
    },
  ],
  2: [
    {
      value: 'hedgehog',
      class: 'red',
      id: null,
      inside: [
        {
          value: 'apple',
          class: 'green',
          id: null,
          inside: null,
        },
        {
          value: 'apple',
          class: 'white',
          id: null,
          inside: [
            {
              value: 'caterpillar',
              class: null,
              id: null,
              inside: null,
            },
          ],
        },
      ],
    },
    {
      value: 'apple',
      class: null,
      id: 'big',
      inside: [
        {
          value: 'caterpillar',
          class: null,
          id: null,
          inside: null,
        },
      ],
    },
    {
      value: 'flower',
      class: null,
      id: null,
      inside: [
        {
          value: 'butterfly',
          class: null,
          id: null,
          inside: null,
        },
      ],
    },
  ],
};
