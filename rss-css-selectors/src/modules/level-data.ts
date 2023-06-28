import { Levels, Unswers } from '../types/types';

export const levelData: Levels = {
  1: [
    {
      value: 'apple',
      class: null,
      id: null,
      animation: true,
      inside: null,
    },
    {
      value: 'apple',
      class: null,
      id: null,
      animation: true,
      inside: null,
    },
    {
      value: 'apple',
      class: null,
      id: null,
      animation: true,
      inside: null,
    },
  ],
  2: [
    {
      value: 'flower',
      class: null,
      id: null,
      animation: true,
      inside: null,
    },
    {
      value: 'apple',
      class: null,
      id: null,
      animation: false,
      inside: null,
    },
    {
      value: 'flower',
      class: null,
      id: null,
      animation: true,
      inside: null,
    },
  ],
  3: [
    {
      value: 'caterpillar',
      class: null,
      id: 'ungry',
      animation: true,
      inside: null,
    },
    {
      value: 'caterpillar',
      class: null,
      id: null,
      animation: false,
      inside: null,
    },
    {
      value: 'flower',
      class: null,
      id: null,
      animation: false,
      inside: null,
    },
  ],
  4: [
    {
      value: 'hedgehog',
      class: null,
      id: null,
      animation: false,
      inside: null,
    },
    {
      value: 'apple',
      class: null,
      id: null,
      animation: false,
      inside: [
        {
          value: 'caterpillar',
          class: null,
          id: null,
          animation: true,
          inside: null,
        },
      ],
    },
    {
      value: 'caterpillar',
      class: null,
      id: null,
      animation: false,
      inside: null,
    },
  ],
  5: [
    {
      value: 'apple',
      class: null,
      id: null,
      animation: false,
      inside: null,
    },
    {
      value: 'apple',
      class: 'small',
      id: null,
      animation: false,
      inside: null,
    },
    {
      value: 'flower',
      class: null,
      id: 'red',
      animation: false,
      inside: [
        {
          value: 'butterfly',
          class: null,
          id: null,
          animation: true,
          inside: null,
        },
      ],
    },
    {
      value: 'flower',
      class: null,
      id: null,
      animation: false,
      inside: [
        {
          value: 'butterfly',
          class: null,
          id: null,
          animation: false,
          inside: null,
        },
      ],
    },
  ],
  6: [
    {
      value: 'apple',
      class: null,
      id: null,
      animation: false,
      inside: [
        {
          value: 'butterfly',
          class: null,
          id: null,
          animation: false,
          inside: null,
        },
      ],
    },
    {
      value: 'apple',
      class: 'small',
      id: null,
      animation: true,
      inside: null,
    },
    {
      value: 'hedgehog',
      class: null,
      id: null,
      animation: false,
      inside: [
        {
          value: 'apple',
          class: 'small',
          id: null,
          animation: true,
          inside: null,
        },
      ],
    },
    {
      value: 'flower',
      class: null,
      id: null,
      animation: false,
      inside: [
        {
          value: 'caterpillar',
          class: null,
          id: null,
          animation: false,
          inside: null,
        },
      ],
    },
    {
      value: 'flower',
      class: null,
      id: null,
      animation: false,
      inside: [
        {
          value: 'butterfly',
          class: null,
          id: null,
          animation: false,
          inside: null,
        },
      ],
    },
  ],
  7: [
    {
      value: 'apple',
      class: null,
      id: null,
      animation: false,
      inside: [
        {
          value: 'caterpillar',
          class: 'small',
          id: null,
          animation: true,
          inside: null,
        },
      ],
    },
    {
      value: 'apple',
      class: null,
      id: null,
      animation: false,
      inside: [
        {
          value: 'butterfly',
          class: 'small',
          id: null,
          animation: false,
          inside: null,
        },
      ],
    },
    {
      value: 'apple',
      class: null,
      id: null,
      animation: false,
      inside: [
        {
          value: 'caterpillar',
          class: 'small',
          id: null,
          animation: true,
          inside: null,
        },
      ],
    },
    {
      value: 'caterpillar',
      class: 'angry',
      id: null,
      animation: false,
      inside: null,
    },
  ],
  8: [
    {
      value: 'hedgehog',
      class: null,
      id: null,
      animation: true,
      inside: [
        {
          value: 'apple',
          class: 'small',
          id: null,
          animation: false,
          inside: null,
        },
        {
          value: 'apple',
          class: 'small',
          id: null,
          animation: false,
          inside: null,
        },
      ],
    },
    {
      value: 'apple',
      class: null,
      id: null,
      animation: true,
      inside: [
        {
          value: 'caterpillar',
          class: 'small',
          id: null,
          animation: false,
          inside: null,
        },
      ],
    },
    {
      value: 'flower',
      class: null,
      id: null,
      animation: true,
      inside: [
        {
          value: 'butterfly',
          class: null,
          id: null,
          animation: false,
          inside: null,
        },
      ],
    },
    {
      value: 'caterpillar',
      class: null,
      id: null,
      animation: false,
      inside: null,
    },
  ],
  9: [
    {
      value: 'hedgehog',
      class: null,
      id: null,
      animation: false,
      inside: [
        {
          value: 'apple',
          class: 'small',
          id: null,
          animation: true,
          inside: null,
        },
      ],
    },
    {
      value: 'apple',
      class: 'small',
      id: null,
      animation: false,
      inside: null,
    },
    {
      value: 'hedgehog',
      class: null,
      id: null,
      animation: false,
      inside: [
        {
          value: 'apple',
          class: 'small',
          id: null,
          animation: true,
          inside: null,
        },
        {
          value: 'apple',
          class: 'small',
          id: null,
          animation: false,
          inside: null,
        },
      ],
    },
    {
      value: 'hedgehog',
      class: null,
      id: null,
      animation: false,
      inside: null,
    },
    {
      value: 'hedgehog',
      class: null,
      id: null,
      animation: false,
      inside: [
        {
          value: 'apple',
          class: 'small',
          id: null,
          animation: true,
          inside: null,
        },
      ],
    },
  ],
  10: [
    {
      value: 'apple',
      class: null,
      id: 'green',
      animation: true,
      inside: [
        {
          value: 'butterfly',
          class: 'small',
          id: null,
          animation: false,
          inside: null,
        },
      ],
    },
    {
      value: 'apple',
      class: null,
      id: null,
      animation: true,
      inside: [
        {
          value: 'flower',
          class: null,
          id: null,
          animation: false,
          inside: null,
        },
      ],
    },
    {
      value: 'apple',
      class: 'small',
      id: null,
      animation: true,
      inside: null,
    },
    {
      value: 'apple',
      class: null,
      id: null,
      animation: true,
      inside: [
        {
          value: 'caterpillar',
          class: 'angry',
          id: null,
          animation: false,
          inside: null,
        },
      ],
    },
    {
      value: 'flower',
      class: null,
      id: null,
      animation: true,
      inside: null,
    },
  ],
};

export const levelUnswer: Unswers = {
  1: ['apple', '*'],
  2: ['flower'],
  3: ['#ungry'],
  4: ['apple caterpillar', 'apple>caterpillar'],
  5: ['#red butterfly', '#red>butterfly'],
  6: ['.small'],
  7: ['apple caterpillar.small', 'apple>caterpillar.small'],
  8: ['hedgehog, apple, flower'],
  9: ['hedgehog:first-child'],
  10: ['*'],
};

export const results: (null | string)[] = [null, null, null, null, null, null, null, null, null, null];
export const curentLevel: (null | string)[] = ['curent', null, null, null, null, null, null, null, null, null];
