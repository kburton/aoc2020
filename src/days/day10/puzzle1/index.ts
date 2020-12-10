const getDiffCounts = (sortedNumbers: Array<number>): {[key: number]: number} => {
  const diffCounts: {[key: number]: number} = {};
  for (let i = 1; i < sortedNumbers.length; i++) {
    const diff = sortedNumbers[i] - sortedNumbers[i-1];
    const count = diffCounts[diff] ? diffCounts[diff] : 0;
    diffCounts[diff] = count + 1;
  }
  return diffCounts;
};

const applySourceAndDevice = (sortedNumbers: Array<number>): Array<number> =>
  [0, ...sortedNumbers, sortedNumbers[sortedNumbers.length - 1] + 3];

const solution = (data: Array<string>): string => {
  const sortedNumbers = applySourceAndDevice(
    data.map(value => parseInt(value)).sort((a: number, b: number) => a - b)
  );
  const diffCounts = getDiffCounts(sortedNumbers);
  const diff1Count = diffCounts[1] || 0;
  const diff3Count = diffCounts[3] || 0;
  return `${diff1Count * diff3Count}`;
};

export default solution;
