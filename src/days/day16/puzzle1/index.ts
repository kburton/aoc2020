interface Range {
  min: number;
  max: number;
}

interface Rule {
  name: string;
  ranges: Array<Range>;
}

type Ticket = Array<number>;

export interface Notes {
  rules: Array<Rule>;
  myTicket: Ticket;
  nearbyTickets: Array<Ticket>;
}

export const parseData = (data: Array<string>): Notes => {
  let currentIndex = 0;
  const rules: Array<Rule> = [];

  while (data[currentIndex] !== "") {
    const [name, rangeSegment] = data[currentIndex].split(": ");
    const rangeStrings = rangeSegment.split(" or ");
    const ranges: Array<Range> = rangeStrings
      .map(r => r.split("-"))
      .map(arr => ({ min: parseInt(arr[0], 10), max: parseInt(arr[1], 10) }));
    rules.push({ name, ranges });
    currentIndex++;
  }
  currentIndex += 2;

  const myTicket: Ticket = data[currentIndex].split(",").map(value => parseInt(value, 10));
  currentIndex += 3;

  const nearbyTickets: Array<Ticket> = [];
  while (currentIndex < data.length) {
    nearbyTickets.push(data[currentIndex].split(",").map(value => parseInt(value, 10)));
    currentIndex++;
  }

  return {
    rules,
    myTicket,
    nearbyTickets
  };
};

const findInvalidValues = (ticket: Ticket, rules: Array<Rule>): Array<number> => {
  const ranges = rules.flatMap(rule => rule.ranges);
  return ticket.filter(value => !ranges.some(range => value >= range.min && value <= range.max));
};

const solution = (data: Array<string>): string => {
  const notes = parseData(data);
  const invalidValues = notes.nearbyTickets.flatMap(ticket => findInvalidValues(ticket, notes.rules));
  const errorRate = invalidValues.reduce((acc, val) => acc + val, 0);
  return `${errorRate}`;
};

export default solution;
