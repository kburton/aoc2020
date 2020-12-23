type Deck = Array<number>;

export interface Game {
  number: number;
  player1Deck: Deck;
  player2Deck: Deck;
}

let nextGameNumber = 1;
const getNextGameNumber = () => {
  const result = nextGameNumber;
  nextGameNumber++;
  return result;
}

interface Winner {
  player: 1 | 2;
  deck: Deck;
}

export const parseData = (data: Array<string>): Game => {
  const dividerIndex = data.findIndex(line => line === "");
  return {
    number: getNextGameNumber(),
    player1Deck: data.slice(1, dividerIndex).map(num => parseInt(num, 10)),
    player2Deck: data.slice(dividerIndex + 2).map(num => parseInt(num, 10)),
  };
};

const playTurn = (game: Game): Game => {
  const player1Card = game.player1Deck[0];
  const player1Deck = game.player1Deck.slice(1);
  const player2Card = game.player2Deck[0];
  const player2Deck = game.player2Deck.slice(1);
  let subGameWinner: Winner | null = null;

  if (player1Card <= player1Deck.length && player2Card <= player2Deck.length) {
    subGameWinner = playGame({
      number: getNextGameNumber(),
      player1Deck: player1Deck.slice(0, player1Card),
      player2Deck: player2Deck.slice(0, player2Card),
    });
    return subGameWinner.player === 1
      ? { ...game, player1Deck: [ ...player1Deck, player1Card, player2Card ], player2Deck }
      : { ...game, player1Deck, player2Deck: [ ...player2Deck, player2Card, player1Card ] };
  }

  if (player1Card > player2Card) {
    return { ...game, player1Deck: [ ...player1Deck, player1Card, player2Card ], player2Deck };
  } else if (player2Card > player1Card) {
    return { ...game, player1Deck, player2Deck: [ ...player2Deck, player2Card, player1Card ] };
  } else {
    throw new Error(`No winner for cards ${player1Card} and ${player2Card}`);
  }
};

const previousGames = new Set<string>();

const serialiseGame = (game: Game): string =>
  `${game.number}|${game.player1Deck.join(",")}|${game.player2Deck.join(",")}`;

const detectWinner = (game: Game): Winner | null => {
  const serialisedGame = serialiseGame(game);
  if (previousGames.has(serialisedGame)) {
    return { player: 1, deck: game.player1Deck };
  }
  previousGames.add(serialisedGame);

  if (game.player1Deck.length === 0) {
    return { player: 2, deck: game.player2Deck };
  } else if (game.player2Deck.length === 0) {
    return { player: 1, deck: game.player1Deck };
  } else {
    return null;
  }
};

const playGame = (game: Game): Winner => {
  while (true) {
    game = playTurn(game);
    const winningDeck = detectWinner(game);
    if (winningDeck !== null) {
      return winningDeck;
    }
  }
};

const scoreDeck = (deck: Deck): number =>
  deck.reduce((acc, val, index) => acc + (val * (deck.length - index)), 0);

const solution = (data: Array<string>): string => {
  const game = parseData(data);
  const winningGame = playGame(game);
  return `${scoreDeck(winningGame.deck)}`;
};

export default solution;
