import solution, { parseDirections } from ".";

describe("Day 24", () => {
  describe("puzzle 1", () => {
    it("parses directions correctly", () => {
      const data = "sesenwnenenewseeswwsw";
      const expected = ["se", "se", "nw", "ne", "ne", "ne", "w", "se", "e", "sw", "w", "sw"];
      expect(parseDirections(data)).toEqual(expected);
    });

    it("calculates the correct value for the example data", () => {
      const data: Array<string> = [
        "sesenwnenenewseeswwswswwnenewsewsw",
        "neeenesenwnwwswnenewnwwsewnenwseswesw",
        "seswneswswsenwwnwse",
        "nwnwneseeswswnenewneswwnewseswneseene",
        "swweswneswnenwsewnwneneseenw",
        "eesenwseswswnenwswnwnwsewwnwsene",
        "sewnenenenesenwsewnenwwwse",
        "wenwwweseeeweswwwnwwe",
        "wsweesenenewnwwnwsenewsenwwsesesenwne",
        "neeswseenwwswnwswswnw",
        "nenwswwsewswnenenewsenwsenwnesesenew",
        "enewnwewneswsewnwswenweswnenwsenwsw",
        "sweneswneswneneenwnewenewwneswswnese",
        "swwesenesewenwneswnwwneseswwne",
        "enesenwswwswneneswsenwnewswseenwsese",
        "wnwnesenesenenwwnenwsewesewsesesew",
        "nenewswnwewswnenesenwnesewesw",
        "eneswnwswnwsenenwnwnwwseeswneewsenese",
        "neswnwewnwnwseenwseesewsenwsweewe",
        "wseweeenwnesenwwwswnew"
      ];
      expect(solution(data)).toEqual("10");
    });
  });
});
