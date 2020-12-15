type Bits = string;

const wordSize = 36;

interface MaskInstruction {
  type: "mask";
  mask: Bits;
}

interface WriteInstruction {
  type: "write";
  address: Bits;
  value: Bits;
}

type Instruction = MaskInstruction | WriteInstruction;

export const intToBits = (value: number): Bits => {
  const bits = Array(wordSize).fill("0");
  let currentIndex = bits.length - 1;
  let currentValue = value;
  while (currentValue > 0) {
    if (currentValue % 2 === 1) {
      bits[currentIndex] = "1";
    }
    currentValue = Math.floor(currentValue / 2);
    currentIndex--;
  }
  return bits.join("");
};

export const bitsToInt = (bits: Bits): number => {
  const bitArray = bits.split("").reverse();
  let result = 0;
  for (let i = 0; i < bitArray.length; i++) {
    result += bitArray[i] === "0" ? 0 : Math.pow(2, i);
  }
  return result;
};

const getAllMemoryAddresses = (address: Array<string>, mask: Array<string>): Array<Bits> => {
  const result = [...address];
  for (let i = 0; i < address.length; i++) {
    if (mask[i] === "1") {
      result[i] = "1";
    } else if (mask[i] === "X") {
      const prefix = result.slice(0, i);
      const suffix = result.slice(i + 1);
      const newMask = [...mask.slice(0, i), "0", ...mask.slice(i + 1)];
      return [
        ...getAllMemoryAddresses([...prefix, "0", ...suffix], newMask),
        ...getAllMemoryAddresses([...prefix, "1", ...suffix], newMask)
      ];
    }
  }
  return [result.join("")];
};

const runProgram = (instructions: Array<Instruction>): {[key: number]: string} => {
  let currentMask = Array(wordSize).fill("0").join("");
  const memory: {[key: string]: string} = {};
  for (const instruction of instructions) {
    switch (instruction.type) {
      case "mask":
        currentMask = instruction.mask;
        break;
      case "write":
        getAllMemoryAddresses(instruction.address.split(""), currentMask.split(""))
          .forEach(addr => memory[addr] = instruction.value);
        break;
    }
  }
  return memory;
};

const parseLine = (line: string): Instruction => {
  const maskPrefix = "mask = ";
  if (line.startsWith(maskPrefix)) {
    return {
      type: "mask",
      mask: line.slice(maskPrefix.length)
    }
  }

  const regex = /^mem\[(\d+)] = (\d+)$/;
  const matches = line.match(regex);
  if (!matches) {
    throw new Error(`Invalid instruction: ${line}`);
  }

  return {
    type: "write",
    address: intToBits(parseInt(matches[1], 10)),
    value: intToBits(parseInt(matches[2]))
  };
};

const solution = (data: Array<string>): string => {
  const instructions = data.map(parseLine);
  const memory = runProgram(instructions);
  const memorySum = Object.values(memory).map(bitsToInt).reduce((acc, val) => acc + val, 0);
  return `${memorySum}`;
};

export default solution;
