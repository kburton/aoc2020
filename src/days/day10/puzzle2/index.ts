export const countPermutationsInRunOfOnes = (runLength: number): number => {
  if (runLength <= 4) {
    return Math.pow(2, runLength - 2);
  }

  return countPermutationsInRunOfOnes(runLength - 1) +
    countPermutationsInRunOfOnes(runLength - 2) +
    countPermutationsInRunOfOnes(runLength - 3);
};

const getSingleRunGroups = (sortedNumbers: Array<number>): Array<number> => {
  const groups: Array<number> = [];
  let groupSize = 1;
  for (let i = 1; i < sortedNumbers.length - 1; i++) {
    if (sortedNumbers[i] === sortedNumbers[i-1] + 1) {
      groupSize++
    } else if (groupSize > 1) {
      groups.push(groupSize);
      groupSize = 1;
    }
  }
  if (groupSize > 1) {
    groups.push(groupSize);
  }
  return groups;
};

const applySourceAndDevice = (sortedNumbers: Array<number>): Array<number> =>
  [0, ...sortedNumbers, sortedNumbers[sortedNumbers.length - 1] + 3];

const solution = (data: Array<string>): string => {
  const sortedNumbers = applySourceAndDevice(
    data.map(value => parseInt(value)).sort((a: number, b: number) => a - b)
  );
  const groups = getSingleRunGroups(sortedNumbers);
  const permutations = groups.reduce((acc, groupLength) => acc * countPermutationsInRunOfOnes(groupLength), 1);
  return `${permutations}`;
};

export default solution;
