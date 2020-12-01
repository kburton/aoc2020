const solution = (data: Array<number>): number => {
  for (let i = 0; i < data.length; i++) {
    for (let j = i + 1; j < data.length; j++) {
      for (let k = j + 1; k < data.length; k++) {
        if (data[i] + data[j] + data[k] === 2020) {
          return data[i] * data[j] * data[k];
        }
      }
    }
  }
  throw new Error("No valid numbers found");
};

export default solution;
