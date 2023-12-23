import { Models } from '$shared';

export const titForTat = (gameState: Models.GameState, opponentNum: number): Models.Strategy => {
  if (gameState.round === 0) {
    return Models.Strategy.coop;
  } else if (getLastItem(gameState.playerHistory[opponentNum]) === Models.Strategy.coop) {
    return Models.Strategy.coop;
  } else if (getLastItem(gameState.playerHistory[opponentNum]) === Models.Strategy.defect) {
    return Models.Strategy.defect;
  }
  console.error('Unknown condition');
  return Models.Strategy.coop;
};

const getLastItem = <t>(array: t[]) => {
  return array[array.length - 1];
};
