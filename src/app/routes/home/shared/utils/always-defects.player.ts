import { Models } from '$shared';

export const alwaysDefects = (gameState: Models.GameState, opponentNum: number): Models.Strategy => {
  return Models.Strategy.defect;
};
