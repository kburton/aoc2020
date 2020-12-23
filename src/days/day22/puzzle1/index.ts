type Deck = Array<number>;

export interface Game {
  player1Deck: Deck;
  player2Deck: Deck;
}

export const parseData = (data: Array<string>): Game => {
  const dividerIndex = data.findIndex(line => line === "");
  return {
    player1Deck: data.slice(1, dividerIndex).map(num => parseInt(num, 10)),
    player2Deck: data.slice(dividerIndex + 2).map(num => parseInt(num, 10)),
  };
};

const playTurn = (game: Game): Game => {
  const player1Card = game.player1Deck[0];
  const player2Card = game.player2Deck[0];
  if (player1Card > player2Card) {
    return {
      player1Deck: [...game.player1Deck.slice(1), player1Card, player2Card],
      player2Deck: game.player2Deck.slice(1),
    };
  } else if (player2Card > player1Card) {
    return {
      player1Deck: game.player1Deck.slice(1),
      player2Deck: [...game.player2Deck.slice(1), player2Card, player1Card],
    };
  } else {
    throw new Error(`No winner for cards ${player1Card} and ${player2Card}`);
  }
};

const detectWinner = (game: Game): Deck | null => {
  if (game.player1Deck.length === 0) {
    return game.player2Deck;
  } else if (game.player2Deck.length === 0) {
    return game.player1Deck;
  } else {
    return null;
  }
};

const playGame = (game: Game): Deck => {
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
  const winningDeck = playGame(game);
  return `${scoreDeck(winningDeck)}`;
};

export default solution;
