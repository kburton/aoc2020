export interface OuterBag {
  description: string;
  innerBags: Array<InnerBag>;
}

export interface InnerBag {
  description: string;
  count: number;
}

interface MultipliedInnerBag {
  innerBag: InnerBag;
  multiplier: number;
}

export const parseInnerBag = (text: string): InnerBag | null => {
  if (text.substr(0, 2) === "no") {
    return null;
  }
  const regex = /^(\d+) (.+) bag/;
  const matches = text.match(regex);
  if (!matches) {
    throw new Error(`Invalid inner bag text: ${text}`);
  }

  return {
    description: matches[2],
    count: parseInt(matches[1]),
  };
};

export const parseLine = (line: string): OuterBag => {
  const [description, innerBagsText] = line.split(" bags contain ");
  const innerBags = innerBagsText.split(", ").flatMap(text => {
    const innerBag = parseInnerBag(text);
    return innerBag === null ? [] : [innerBag];
  });
  return {
    description,
    innerBags
  }
};

const findMultipliedInnerBags = (outerBags: Array<OuterBag>, outerBagDescription: string, multiplier = 1): Array<MultipliedInnerBag> => {
  const innerBags = outerBags
    .filter(outerBag => outerBag.description === outerBagDescription)
    .flatMap(outerBag => outerBag.innerBags);
  return innerBags
    .flatMap(innerBag => findMultipliedInnerBags(outerBags, innerBag.description, multiplier * innerBag.count))
    .concat(innerBags.map(innerBag => ({ innerBag, multiplier })));
};

const solution = (data: Array<string>): string => {
  const outerBags = data.map(parseLine);
  const multipliedInnerBags = findMultipliedInnerBags(outerBags, "shiny gold");
  return `${multipliedInnerBags.reduce((acc, bag) => bag.innerBag.count * bag.multiplier + acc, 0)}`;
};

export default solution;
