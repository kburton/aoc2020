const intersect = (set1: Set<string>, set2: Set<string>): Set<string> => (
  new Set<string>([...set1].filter(val => set2.has(val)))
);

const extractGroups = (data: Array<string>): Array<Set<string>> => {
  let currentGroup = null;
  const groups: Array<Set<string>> = [];

  for (const line of data) {
    if (line === "") {
      if (currentGroup !== null) {
        groups.push(currentGroup);
        currentGroup = null;
      }
    } else {
      const newGroup = new Set<string>(line.split(""));
      currentGroup = currentGroup === null ? newGroup : intersect(currentGroup, newGroup);
    }
  }

  if (currentGroup !== null) {
    groups.push(currentGroup);
  }

  return groups;
};


const solution = (data: Array<string>): string => {
  return `${extractGroups(data).reduce((acc, group) => acc + group.size, 0)}`;
};

export default solution;
