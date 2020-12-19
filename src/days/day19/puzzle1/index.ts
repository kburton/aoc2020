type RuleId = number;
type Sequence = Array<RuleId>;

interface CharRule {
  type: "char";
  char: string;
}

interface SequenceRule {
  type: "sequence";
  sequences: Array<Sequence>;
}

type Rule = CharRule | SequenceRule;

type Rules = { [key: number]: Rule };

export interface Input {
  rules: Rules;
  messages: Array<string>;
}

const parseRule = (ruleStr: string): Rule => {
  if (ruleStr.startsWith('"')) {
    return { type: "char", char: ruleStr.substr(1, ruleStr.length - 2) };
  }
  const sequences = ruleStr.split(" | ");
  return {
    type: "sequence",
    sequences: sequences.map(s => s.split(" ").map(val => parseInt(val, 10)))
  }
};

export const parseData = (data: Array<string>): Input => {
  const rules: Rules = {};
  let currentIndex = 0;
  while (data[currentIndex] !== "") {
    const [idStr, ruleStr] = data[currentIndex].split(": ");
    rules[parseInt(idStr, 10)] = parseRule(ruleStr);
    currentIndex++;
  }
  return {
    rules,
    messages: data.slice(currentIndex + 1)
  };
};

interface PartialValidationResultValid {
  type: "valid";
  remainingMessage: string;
}

interface PartialValidationResultInvalid {
  type: "invalid";
}

type PartialValidationResult = PartialValidationResultValid | PartialValidationResultInvalid;

const validateChar = (message: string, char: string): PartialValidationResult => {
  if (message.length > 0 && message[0] === char) {
    return { type: "valid", remainingMessage: message.substr(1) };
  }
  return { type: "invalid" };
};

const validateSequence = (message: string, sequence: Sequence, rules: Rules): boolean => {
  if (message.length === 0) {
    return sequence.length === 0;
  }
  if (sequence.length === 0 && message.length !== 0) {
    return false;
  }
  const firstRule = rules[sequence[0]];
  switch (firstRule.type) {
    case "char":
      const charResult = validateChar(message, firstRule.char);
      switch (charResult.type) {
        case "valid":
          return validateSequence(
            charResult.remainingMessage,
            sequence.slice(1),
            rules
          )
      }
      return false;
    case "sequence":
      for (const option of firstRule.sequences) {
        const trialSequence = [...option, ...sequence.slice(1)];
        const result = validateSequence(message, trialSequence, rules);
        if (result) {
          return true;
        }
      }
      return false;
  }
};

const isValid = (message: string, rule: Rule, rules: Rules): boolean => {
  switch (rule.type) {
    case "sequence":
      for (const sequence of rule.sequences) {
        if (validateSequence(message, sequence, rules)) {
          return true;
        }
      }
      return false;
    case "char":
      throw new Error("Main rule must be a sequence rule");
  }
}

const solution = (data: Array<string>): string => {
  const input = parseData(data);
  const mainRule = input.rules[0];
  const validMessages = input.messages.filter(message => isValid(message, mainRule, input.rules));
  return `${validMessages.length}`;
};

export default solution;
