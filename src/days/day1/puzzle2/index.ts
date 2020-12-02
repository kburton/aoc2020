const solution = (data: Array<string>): string => {
  const numbers = data.map(value => parseInt(value, 10));
  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      for (let k = j + 1; k < numbers.length; k++) {
        if (numbers[i] + numbers[j] + numbers[k] === 2020) {
          return `${numbers[i] * numbers[j] * numbers[k]}`;
        }
      }
    }
  }
  throw new Error("No valid numbers found");
};

export default solution;
