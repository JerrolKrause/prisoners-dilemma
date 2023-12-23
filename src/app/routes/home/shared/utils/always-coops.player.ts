import { Models } from '$shared';

export const alwaysCoops = (gameState: Models.GameState, opponentNum: number): Models.Strategy => {
  return Models.Strategy.coop;
};
