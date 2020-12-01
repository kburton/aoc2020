import { readFileSync } from "fs";
import solution from "./solution";

const run = async (): Promise<string> => {
  const data: Array<number> = readFileSync(`${__dirname}/data.txt`, "utf8")
    .split("\n")
    .map(value => parseInt(value, 10));
  return `${solution(data)}`;
};

export default run;
