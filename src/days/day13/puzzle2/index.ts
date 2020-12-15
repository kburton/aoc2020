interface Bus {
  index: number;
  id: number;
}

const areBusesSequenced = (timeOffset: number, buses: Array<Bus>): boolean => {
  for (const bus of buses) {
    if ((timeOffset + bus.index) % bus.id !== 0) {
      return false;
    }
  }
  return true;
};

const findFirstSequenceTimeOffset = (buses: Array<Bus>): number => {
  const orderedBuses = buses.sort((a, b) => a.id < b.id ? 1 : -1);
  for (let t = 0;; t += orderedBuses[0].id) {
    if (t % (orderedBuses[0].id * 1000000000) === 0) {
      console.log(`Processed ${t} timestamps...`);
    }
    if (areBusesSequenced(t - orderedBuses[0].index, orderedBuses)) {
      return t - orderedBuses[0].index;
    }
  }
};

const parseData = (data: Array<string>): Array<Bus> => data[1]
  .split(",")
  .map((id, index): Bus => ({ index, id: parseInt(id, 10) }))
  .filter(bus => !isNaN(bus.id));

const solution = (data: Array<string>): string => {
  const buses = parseData(data);
  const timeOffset = findFirstSequenceTimeOffset(buses);
  return `${timeOffset}`;
};

export default solution;
