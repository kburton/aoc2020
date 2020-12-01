const solution = (data: Array<number>): number => {
  for (let i = 0; i < data.length; i++) {
    for (let j = i + 1; j < data.length; j++) {
      if (data[i] + data[j] === 2020) {
        return data[i] * data[j];
      }
    }
  }
  throw new Error("No valid numbers found");
};

export default solution;
