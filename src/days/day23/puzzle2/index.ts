interface Cup {
  value: number;
  next: Cup;
}

interface UnlinkedCup {
  value: number;
  next: Cup | UnlinkedCup | null;
}

const removeThreeCups = (previousCup: Cup): Cup => {
  const removedLoopFirstCup = previousCup.next;
  const removedLoopLastCup = removedLoopFirstCup.next.next;
  previousCup.next = removedLoopLastCup.next;
  removedLoopLastCup.next = removedLoopFirstCup;
  return removedLoopFirstCup;
};

const insertThreeCups = (previousCup: Cup, cupsToInsert: Cup): void => {
  const mainLoopFirstCup = previousCup.next;
  const insertLoopLastCup = cupsToInsert.next.next;
  previousCup.next = cupsToInsert;
  insertLoopLastCup.next = mainLoopFirstCup;
};

const insertNewCup = (previousCup: Cup, value: number): void => {
  previousCup.next = {
    value,
    next: previousCup.next
  };
};

interface CupData {
  activeCup: Cup;
  lookup: { [key: number]: Cup }
  min: number;
  max: number;
}

const parseData = (data: Array<string>): CupData => {
  const cupValues = data[0].split("").map(val => parseInt(val, 10));
  const lookup: { [key: number]: Cup } = {};
  const unlinkedCup: UnlinkedCup = {
    value: cupValues[0],
    next: null
  };
  unlinkedCup.next = unlinkedCup;
  let cup = unlinkedCup as Cup;
  lookup[cup.value] = cup;

  cupValues.slice(1).forEach(v => {
    insertNewCup(cup, v);
    cup = cup.next;
    lookup[cup.value] = cup;
  });

  const initialMin = Math.min(...cupValues);
  const initialMax = Math.max(...cupValues);
  const numGeneratedCups = 1000000 - cupValues.length;
  let max = initialMax;
  for (let i = 0; i < numGeneratedCups; i++) {
    max = initialMax + i + 1;
    insertNewCup(cup, max);
    cup = cup.next;
    lookup[cup.value] = cup;
  }

  return {
    activeCup: cup.next,
    lookup,
    min: initialMin,
    max
  };
};

const search = (cupData: CupData, missingValues: Array<number>): Cup => {
  let searchValue = cupData.activeCup.value;
  while (missingValues.includes(searchValue)) {
    searchValue--;
    if (searchValue < cupData.min) {
      searchValue = cupData.max;
    }
  }
  return cupData.lookup[searchValue];
};

const move = (cupData: CupData): void => {
  const removedCups = removeThreeCups(cupData.activeCup);
  const missingValues = [
    cupData.activeCup.value,
    removedCups.value,
    removedCups.next.value,
    removedCups.next.next.value
  ];
  const destinationCup = search(cupData, missingValues);
  insertThreeCups(destinationCup, removedCups);
  cupData.activeCup = cupData.activeCup.next;
};

const solution = (data: Array<string>): string => {
  let cupData = parseData(data);
  for (let i = 0; i < 10000000; i++) {
    move(cupData);
  }
  const cup1 = cupData.lookup[1];
  const result = cup1.next.value * cup1.next.next.value;
  return `${result}`;
};

export default solution;
