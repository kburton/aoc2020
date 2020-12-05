import solution, { Passport, extractPassports, lineToObject } from ".";

describe("Day 4", () => {
  describe("puzzle 1", () => {
    it("parses individual lines correctly", () => {
      const line = "ecl:gry pid:860033327 eyr:2020 hcl:#fffffd";
      const expected = {
        ecl: "gry",
        pid: "860033327",
        eyr: "2020",
        hcl: "#fffffd",
      };
      expect(lineToObject(line)).toEqual(expected);
    });

    it("generates passport records correctly", () => {
      const data: Array<string> = [
        "ecl:gry pid:860033327 eyr:2020 hcl:#fffffd",
        "byr:1937 iyr:2017 cid:147 hgt:183cm",
        "",
        "iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884",
        "hcl:#cfa07d byr:1929",
        "",
        "hcl:#ae17e1 iyr:2013",
        "eyr:2024",
        "ecl:brn pid:760753108 byr:1931",
        "hgt:179cm",
        "",
        "hcl:#cfa07d eyr:2025 pid:166559648",
        "iyr:2011 ecl:brn hgt:59in"
      ];
      const expected: Array<Passport> = [
        {ecl: "gry", pid: "860033327", eyr: "2020", hcl: "#fffffd", byr: "1937", iyr: "2017", cid: "147", hgt: "183cm"},
        {ecl: "amb", pid: "028048884", eyr: "2023", hcl: "#cfa07d", byr: "1929", iyr: "2013", cid: "350"},
        {ecl: "brn", pid: "760753108", eyr: "2024", hcl: "#ae17e1", byr: "1931", iyr: "2013", hgt: "179cm"},
        {ecl: "brn", pid: "166559648", eyr: "2025", hcl: "#cfa07d", iyr: "2011", hgt: "59in"},
      ];
      expect(extractPassports(data)).toEqual(expected);
    });

    it("calculates the correct value for the example data", () => {
      const data: Array<string> = [
        "ecl:gry pid:860033327 eyr:2020 hcl:#fffffd",
        "byr:1937 iyr:2017 cid:147 hgt:183cm",
        "",
        "iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884",
        "hcl:#cfa07d byr:1929",
        "",
        "hcl:#ae17e1 iyr:2013",
        "eyr:2024",
        "ecl:brn pid:760753108 byr:1931",
        "hgt:179cm",
        "",
        "hcl:#cfa07d eyr:2025 pid:166559648",
        "iyr:2011 ecl:brn hgt:59in"
      ];
      expect(solution(data)).toEqual("2");
    });
  });
});
