import solution, {bitsToInt, intToBits} from ".";

describe("Day 14", () => {
  describe("puzzle 1", () => {
    it("converts integers to bits correctly", () => {
      const testCases = [
        { value: 0, expected: "000000000000000000000000000000000000" },
        { value: 101, expected: "000000000000000000000000000001100101" },
      ];
      testCases.forEach(({ value, expected }) => expect(intToBits(value)).toEqual(expected));
      expect.assertions(testCases.length);
    });

    it("converts bits to integers correctly", () => {
      const testCases = [
        { bits: "000000000000000000000000000000000000", expected: 0 },
        { bits: "000000000000000000000000000001100101", expected: 101 },
      ];
      testCases.forEach(({ bits, expected }) => expect(bitsToInt(bits)).toEqual(expected));
      expect.assertions(testCases.length);
    });

    it("calculates the correct value for the example data", () => {
      const data: Array<string> = [
        "mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X",
        "mem[8] = 11",
        "mem[7] = 101",
        "mem[8] = 0"
      ];
      expect(solution(data)).toEqual("165");
    });
  });
});
