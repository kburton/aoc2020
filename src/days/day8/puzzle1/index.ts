interface OperationNop {
  type: "nop";
}

interface OperationAcc {
  type: "acc";
  value: number;
}

interface OperationJmp {
  type: "jmp";
  offset: number;
}

type Operation = OperationNop | OperationAcc | OperationJmp;

class InfiniteLoopError extends Error{
  accumulator: number;

  constructor(accumulator: number) {
    super();
    this.accumulator = accumulator;
  }
}

const parseLine = (line: string): Operation => {
  const [name, numberStr] = line.split(" ");
  switch (name) {
    case "nop":
      return { type: name };
    case "acc":
      return { type: name, value: parseInt(numberStr) };
    case "jmp":
      return { type: name, offset: parseInt(numberStr) };
    default:
      throw new Error(`Unrecognised instruction: "${name}"`);
  }
};

const runProgram = (operations: Array<Operation>): number => {
  let programCounter = 0;
  let accumulator = 0;
  const visitedAddresses = new Set<number>();

  while (programCounter < operations.length) {
    if (visitedAddresses.has(programCounter)) {
      throw new InfiniteLoopError(accumulator);
    }
    visitedAddresses.add(programCounter);
    const operation = operations[programCounter];
    switch (operation.type) {
      case "nop":
        programCounter++;
        break;
      case "acc":
        accumulator += operation.value;
        programCounter++;
        break;
      case "jmp":
        programCounter += operation.offset;
        break;
    }
  }

  return accumulator;
};

const solution = (data: Array<string>): string => {
  const operations = data.map(parseLine);
  try {
    const successResult = runProgram(operations);
    return `${successResult}`;
  } catch (e) {
    if (e instanceof InfiniteLoopError) {
      return `${e.accumulator}`;
    }
    throw e;
  }
};

export default solution;
