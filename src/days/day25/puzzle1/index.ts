interface PublicKeys {
  card: number;
  door: number;
}

const parseData = (data: Array<string>): PublicKeys => ({
  card: parseInt(data[0], 10),
  door: parseInt(data[1], 10)
});

export const getLoopSize = (subjectNumber: number, publicKey: number): number => {
  let loop = 0;
  let value = 1;
  while (true) {
    loop++;
    value = (value * subjectNumber) % 20201227;
    if (value === publicKey) {
      return loop;
    }
  }
};

const encrypt = (subjectNumber: number, loopSize: number): number => {
  let value = 1;
  for (let i = 0; i < loopSize; i++) {
    value = (value * subjectNumber) % 20201227;
  }
  return value;
}

const solution = (data: Array<string>): string => {
  const subjectNumber = 7;
  const publicKeys = parseData(data);
  const cardLoopSize = getLoopSize(subjectNumber, publicKeys.card);
  const encryptionKey = encrypt(publicKeys.door, cardLoopSize);
  return `${encryptionKey}`;
};

export default solution;
