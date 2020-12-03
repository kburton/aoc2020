const tree = "#";

const solution = (data: Array<string>): string => {
  let x = 0, y = 0, treeCount = 0;
  while (y < data.length) {
    if (data[y].charAt(x) === tree) {
      treeCount++;
    }
    x = (x + 3) % data[y].length;
    y++;
  }
  return `${treeCount}`;
};

export default solution;
