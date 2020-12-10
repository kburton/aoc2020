const findContiguousSumRange = (target: number, numbers: Array<number>) => {
  const minRangeLength = 2;
  for (let offset = 0; offset < numbers.length - minRangeLength; offset++) {
    for (let rangeLength = minRangeLength; rangeLength < numbers.length - offset; rangeLength++) {
      const range = numbers.slice(offset, offset + rangeLength);
      const sum = range.reduce((acc, val) => acc + val, 0);
      if (sum === target) {
        return range;
      } else if (sum > target) {
        break;
      }
    }
  }
  throw new Error("No valid range found");
};

const solution = (data: Array<string>, step1InvalidNumber = 1212510616): string => {
  const numbers = data.map(value => parseInt(value, 10));
  const range = findContiguousSumRange(step1InvalidNumber, numbers);
  const min = Math.min(...range);
  const max = Math.max(...range);
  return `${min + max}`;
};

export default solution;
