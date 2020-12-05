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

export const lineToObject = (line: string): {[key: string]: string} => (
  line.split(" ").reduce((acc: {[key: string]: string}, keyValuePair) => {
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

const validate = (p: Passport): boolean => (
  !!p.byr && !!p.iyr && !!p.eyr && !!p.hgt && !!p.hcl && !!p.ecl && !!p.pid
);

const solution = (data: Array<string>): string => {
  return `${extractPassports(data).filter(validate).length}`;
};

export default solution;
