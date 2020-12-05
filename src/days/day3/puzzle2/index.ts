const tree = "#";

interface Delta {
  x: number;
  y: number;
}

const check = (data: Array<string>, delta: Delta) : number => {
  let x = 0, y = 0, treeCount = 0;
  while (y < data.length) {
    if (data[y].charAt(x) === tree) {
      treeCount++;
    }
    x = (x + delta.x) % data[y].length;
    y += delta.y;
  }
  return treeCount;
};

const solution = (data: Array<string>): string => {
  const deltas: Array<Delta> = [
    {x: 1, y: 1},
    {x: 3, y: 1},
    {x: 5, y: 1},
    {x: 7, y: 1},
    {x: 1, y: 2},
  ];

  return `${deltas.reduce((acc, delta) => acc * check(data, delta), 1)}`;
};

export default solution;
