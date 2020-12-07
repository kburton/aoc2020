export interface OuterBag {
  description: string;
  innerBags: Array<InnerBag>;
}

export interface InnerBag {
  description: string;
  count: number;
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

const findContainers = (outerBags: Array<OuterBag>, innerBagDescription: string): Array<OuterBag> => {
  const containers = outerBags.filter(outerBag =>
    outerBag.innerBags.some(innerBag => innerBag.description === innerBagDescription)
  );
  return containers.flatMap(container => findContainers(outerBags, container.description)).concat(containers);
};

const solution = (data: Array<string>): string => {
  const outerBags = data.map(parseLine);
  const shinyGoldContainers = findContainers(outerBags, "shiny gold");
  const uniqueContainers = [...(new Set(shinyGoldContainers))];
  return `${uniqueContainers.length}`;
};

export default solution;
