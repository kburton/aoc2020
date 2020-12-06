const extractGroups = (data: Array<string>): Array<Set<string>> => {
  let currentGroup = new Set<string>();
  const groups: Array<Set<string>> = [];

  for (const line of data) {
    if (line === "") {
      if (currentGroup !== null) {
        groups.push(currentGroup);
        currentGroup = new Set<string>();
      }
    } else {
      const chars = line.split("");
      chars.forEach(char => currentGroup.add(char));
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
