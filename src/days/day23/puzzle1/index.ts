interface CupData {
  cups: Array<number>;
}

const parseData = (data: Array<string>): CupData => {
  const cups = data[0].split("").map(val => parseInt(val, 10));
  return {
    cups
  };
};

const findDestinationCupIndex = (activeCup: number, cups: Array<number>): number => {
  const minCup = Math.min(...cups);
  const maxCup = Math.max(...cups);
  while (true) {
    activeCup--;
    if (activeCup < minCup) {
      activeCup = maxCup;
    }
    const index = cups.findIndex(c => c === activeCup);
    if (index !== -1) {
      return index;
    }
  }
};

const move = (cupData: CupData): CupData => {
  const activeCup = cupData.cups[0];
  const pickedUpCups = cupData.cups.slice(1, 4);
  const remainingCups = cupData.cups.slice(4);
  const destinationCupIndex = findDestinationCupIndex(activeCup, remainingCups);
  return {
    cups: [
      ...remainingCups.slice(0, destinationCupIndex + 1),
      ...pickedUpCups,
      ...remainingCups.slice(destinationCupIndex + 1),
      activeCup,
    ]
  }
};

const extractCupsFrom1 = (cupData: CupData): Array<number> => {
  const indexOf1 = cupData.cups.findIndex(c => c === 1);
  return [...cupData.cups.slice(indexOf1 + 1), ...cupData.cups.slice(0, indexOf1)];
};

const solution = (data: Array<string>): string => {
  let cupData = parseData(data);
  for (let i = 0; i < 100; i++) {
    cupData = move(cupData);
  }
  const result = extractCupsFrom1(cupData);
  return `${result.join("")}`;
};

export default solution;
