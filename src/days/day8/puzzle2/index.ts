interface OperationNop {
  type: "nop";
  offset: number;
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
      return { type: name, offset: parseInt(numberStr) };
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

const tryReplacements = (operations: Array<Operation>): number => {
  for (let i = 0; i < operations.length; i++) {
    const operation = operations[i];
    try {
      if (operation.type === "nop") {
        const replacement: Operation = { type: "jmp", offset: operation.offset };
        return runProgram([...operations.slice(0, i), replacement, ...operations.slice(i + 1)]);
      } else if (operation.type === "jmp") {
        const replacement: Operation = { type: "nop", offset: operation.offset };
        return runProgram([...operations.slice(0, i), replacement, ...operations.slice(i + 1)]);
      }
    } catch (e) {
      if (!(e instanceof InfiniteLoopError)) {
        throw e;
      }
    }
  }

  throw new Error("No working replacement found");
};

const solution = (data: Array<string>): string => {
  const operations = data.map(parseLine);
  return `${tryReplacements(operations)}`;
};

export default solution;
