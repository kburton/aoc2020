interface Entry {
  password: string;
  policy: {
    requiredChar: string;
    minOccurrences: number;
    maxOccurrences: number;
  };
}

const parseEntry = (input: string): Entry => {
  const regex = /^(\d+)-(\d+) (.): (.*)$/;
  const segments = input.match(regex);
  if (!segments) {
    throw new Error(`Invalid input string: '${input}'`);
  }
  return {
    password: segments[4],
    policy: {
      requiredChar: segments[3],
      minOccurrences: parseInt(segments[1]),
      maxOccurrences: parseInt(segments[2]),
    },
  }
};

const solution = (data: Array<string>): string => {
  const validPasswords = data.map(parseEntry).filter(({password, policy}) => {
    const occurrences = password.split("").filter(c => c === policy.requiredChar).length;
    return occurrences >= policy.minOccurrences && occurrences <= policy.maxOccurrences;
  });
  return `${validPasswords.length}`;
};

export default solution;
