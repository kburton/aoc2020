export interface Passport {
  byr?: string;
  iyr?: string;
  eyr?: string;
  hgt?: string;
  hcl?: string;
  ecl?: string;
  pid?: string;
  cid?: string;
}

export const lineToObject = (line: string): { [key: string]: string } => (
  line.split(" ").reduce((acc: { [key: string]: string }, keyValuePair) => {
    const [key, value] = keyValuePair.split(":");
    acc[key] = value;
    return acc;
  }, {})
);

export const extractPassports = (data: Array<string>): Array<Passport> => {
  let currentRecord = null;
  const passports: Array<Passport> = [];

  for (const line of data) {
    if (line === "") {
      if (currentRecord !== null) {
        passports.push(currentRecord);
        currentRecord = null;
      }
    } else {
      currentRecord = {...(currentRecord || {}), ...lineToObject(line)};
    }
  }

  if (currentRecord !== null) {
    passports.push(currentRecord);
  }

  return passports;
};

export const requireNumRange = (val: string, min: number, max: number): void => {
  const num = parseInt(val, 10);
  if (num < min || num > max) {
    throw new Error();
  }
};

export const requireValidHeight = (height: string): void => {
  const heightRegex = /^(\d+)(cm|in)$/;
  const matches = height.match(heightRegex);
  if (matches === null) {
    throw new Error();
  }
  switch (matches[2]) {
    case "cm":
      return requireNumRange(matches[1], 150, 193);
    case "in":
      return requireNumRange(matches[1], 59, 76);
  }
  throw new Error();
};

export const requireMatch = (val: string, regex: RegExp): void => {
  if (!val.match(regex)) {
    throw new Error();
  }
};

const validate = (p: Passport): boolean => {
  if (!p.byr || !p.iyr || !p.eyr || !p.hgt || !p.hcl || !p.ecl || !p.pid) {
    return false;
  }

  try {
    requireNumRange(p.byr, 1920, 2002);
    requireNumRange(p.iyr, 2010, 2020);
    requireNumRange(p.eyr, 2020, 2030);
    requireValidHeight(p.hgt);
    requireMatch(p.hcl, /^#[0-9a-f]{6}$/);
    requireMatch(p.ecl, /^amb|blu|brn|gry|grn|hzl|oth$/);
    requireMatch(p.pid, /^\d{9}$/);
    return true;
  } catch (e) {
    return false;
  }
};

const solution = (data: Array<string>): string => {
  return `${extractPassports(data).filter(validate).length}`;
};

export default solution;
