const solution = (data: Array<string>): string => {
  const numbers = data.map(value => parseInt(value, 10));
  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      if (numbers[i] + numbers[j] === 2020) {
        return `${numbers[i] * numbers[j]}`;
      }
    }
  }
  throw new Error("No valid numbers found");
};

export default solution;
