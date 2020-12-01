import commandLineArgs from "command-line-args";
import commandLineUsage from "command-line-usage";

const optionDefinitions = [
  {
    name: "puzzle",
    alias: "p",
    type: String,
    defaultOption: true,
    description: "The day and puzzle in the form `<dayNum>-<puzzleNum>` e.g. 5-1"
  },
];

const usage = [
  {
    header: "Advent of Code Puzzle Runner",
    content: "Runs the specified day's puzzle and outputs the result."
  },
  {
    header: "Options",
    optionList: optionDefinitions
  }
];

const options = commandLineArgs(optionDefinitions);

if (!options.puzzle) {
  console.log(commandLineUsage(usage));
  process.exit(0);
}

const [day, puzzle] = options.puzzle.split("-");

if (!day || !puzzle) {
  console.log(commandLineUsage(usage));
  process.exit(0);
}

import(`${__dirname}/days/day${day}/puzzle${puzzle}`)
  .then(run => run.default())
  .then(result => console.log(result));
