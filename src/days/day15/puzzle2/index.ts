const getNumber = (startingNumbers: Array<number>, endTurn: number): number => {
  let lastNumber = startingNumbers[0];
  const lastNumberTurns = new Array(endTurn);

  for (let currentTurn = 2; currentTurn <= endTurn; currentTurn++) {
    let currentNumber;
    if (currentTurn <= startingNumbers.length) {
      currentNumber = startingNumbers[currentTurn - 1];
    } else if (lastNumberTurns[lastNumber] !== undefined) {
      currentNumber = currentTurn - lastNumberTurns[lastNumber];
    } else {
      currentNumber = 0;
    }
    lastNumberTurns[lastNumber] = currentTurn;
    lastNumber = currentNumber;
  }

  return lastNumber;
};

const parseData = (data: Array<string>): Array<number> => {
  return data[0].split(",").map(value => parseInt(value, 10));
}

const solution = (data: Array<string>): string => {
  const startingNumbers = parseData(data);
  const finalNumber = getNumber(startingNumbers, 30000000);
  return `${finalNumber}`;
};

export default solution;
