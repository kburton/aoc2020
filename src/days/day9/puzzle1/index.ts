const hasValidSum = (target: number, options: Array<number>): boolean => {
  for (let i = 0; i < options.length; i++) {
    for (let j = i + 1; j < options.length; j++) {
      if (options[i] + options[j] === target) {
        return true;
      }
    }
  }
  return false;
};

const solution = (data: Array<string>, preambleLength = 25): string => {
  const numbers = data.map(value => parseInt(value, 10));
  for (let i = preambleLength; i < numbers.length; i++) {
    const target = numbers[i];
    const options = numbers.slice(i - preambleLength, i);
    if (!hasValidSum(target, options)) {
      return `${target}`;
    }
  }
  throw new Error("No value found");
};

export default solution;
