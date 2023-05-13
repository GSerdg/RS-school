const settings = {
  row: 10,
  cell: 10,
  mine: 30,
  rowExcl: false,
  cellExcl: false,
};

function shuffle(arr) {
  const array = arr.slice();
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Создает матрицу чисел на основе расставленных мин
function feelNumbers(matrix) {
  const arr = [];
  for (let i = 0; i < matrix.length + 2; i += 1) {
    arr[i] = new Array(matrix[0].length + 2);
    arr[i].fill(0);
  }

  for (let i = 1; i < matrix.length + 1; i += 1) {
    for (let j = 1; j < matrix[1].length + 1; j += 1) {
      if (matrix[i - 1][j - 1]) {
        arr[i - 1][j - 1] += 1;
        arr[i - 1][j] += 1;
        arr[i - 1][j + 1] += 1;
        arr[i][j - 1] += 1;
        arr[i][j + 1] += 1;
        arr[i + 1][j - 1] += 1;
        arr[i + 1][j] += 1;
        arr[i + 1][j + 1] += 1;
      }
    }
  }
  arr.pop();
  arr.shift();
  arr.forEach((item) => {
    item.pop();
    item.shift();
  });
  return arr;
}

// Создает матрицу случайной расстановки мин
// принимает размеры матрицы и количество мин
function feelMines(row, cell, mine, rowExcl, cellExcl) {
  const minesMatrix = [];
  const array = [];
  // Абсолютный номер нажатой клетки для исключения из массива мин
  const number = rowExcl * cell + cellExcl;
  console.log(number);
  for (let i = 0; i < row * cell; i += 1) {
    if (i !== number) array.push(i);
  }
  console.log(array);
  const minesArray = shuffle(array).slice(0, mine);

  for (let i = 0; i < row; i += 1) {
    const arr = Array(cell).fill(false);
    minesMatrix.push(arr);
  }

  minesArray.forEach((item) => {
    const a = Math.floor(item / cell);
    const b = item - cell * a;
    minesMatrix[a][b] = true;
  });
  const minesNumbers = feelNumbers(minesMatrix);

  minesArray.forEach((item) => {
    const a = Math.floor(item / cell);
    const b = item - cell * a;
    minesNumbers[a][b] = 'mine';
  });
  console.log(minesNumbers);
  // console.log(minesMatrix);

  return minesNumbers;
}

export { feelMines, settings };
