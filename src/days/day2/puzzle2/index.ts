interface Entry {
  password: string;
  policy: {
    requiredChar: string;
    checkIndex1: number;
    checkIndex2: number;
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
      checkIndex1: parseInt(segments[1]) - 1,
      checkIndex2: parseInt(segments[2]) - 1,
    },
  }
};

const solution = (data: Array<string>): string => {
  const validPasswords = data.map(parseEntry).filter(({password, policy}) => {
    const matchCountPos1 = password.charAt(policy.checkIndex1) === policy.requiredChar ? 1 : 0;
    const matchCountPos2 = password.charAt(policy.checkIndex2) === policy.requiredChar ? 1 : 0;
    return matchCountPos1 + matchCountPos2 === 1;
  });
  return `${validPasswords.length}`;
};

export default solution;
