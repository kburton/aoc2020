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

interface ColumnMap {
  name: string;
  columns: Array<number>;
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

const isTicketValid = (ticket: Ticket, rules: Array<Rule>): boolean => {
  const ranges = rules.flatMap(rule => rule.ranges);
  return !ticket.some(value => !ranges.some(range => value >= range.min && value <= range.max));
};

const findValidColumns = (tickets: Array<Ticket>, rule: Rule): Array<number> => {
  const validColumns: Array<number> = [];
  for (let i = 0; i < tickets[0].length; i++) {
    let valid = true;
    for (let t = 0; t < tickets.length; t++) {
      if (!rule.ranges.some(range => tickets[t][i] >= range.min && tickets[t][i] <= range.max)) {
        valid = false;
        break;
      }
    }
    if (valid) {
      validColumns.push(i);
    }
  }
  return validColumns;
};

const generateColumnMaps = (tickets: Array<Ticket>, rules: Array<Rule>): Array<ColumnMap> =>
  rules.map(rule => ({ name: rule.name, columns: findValidColumns(tickets, rule) }));

const refineColumnMaps = (columnMaps: Array<ColumnMap>): Array<ColumnMap> => {
  const processedColumns: Array<number> = [];
  let updatesFound = true;
  while (updatesFound) {
    updatesFound = false;
    for (let i = 0; i < columnMaps.length; i++) {
      if (columnMaps[i].columns.length === 1 && !processedColumns.includes(columnMaps[i].columns[0])) {
        for (let j = 0; j < columnMaps.length; j++) {
          if (i !== j) {
            const newColumns = columnMaps[j].columns.filter(c => c !== columnMaps[i].columns[0]);
            if (newColumns.length !== columnMaps[j].columns.length) {
              columnMaps[j].columns = newColumns;
              updatesFound = true;
            }
          }
        }
        processedColumns.push(columnMaps[i].columns[0]);
      }
    }
  }
  return columnMaps;
};

const solution = (data: Array<string>): string => {
  const notes = parseData(data);
  const validNearbyTickets = notes.nearbyTickets.filter(ticket => isTicketValid(ticket, notes.rules));
  const columnMaps = generateColumnMaps(validNearbyTickets, notes.rules);
  const refinedColumnMaps = refineColumnMaps(columnMaps);
  const departureColumnMaps = refinedColumnMaps.filter(({ name }) => name.startsWith("departure"));
  const multiple = departureColumnMaps.reduce(
    (acc, cm) => acc * notes.myTicket[cm.columns[0]],
    1
  );
  return `${multiple}`;
};

export default solution;
