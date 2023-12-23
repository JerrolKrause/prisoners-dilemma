import { Models } from '$shared';

export const random = (gameState: Models.GameState, opponentNum: number): Models.Strategy => {
  // return Models.Strategy.defect;
  return Math.random() >= 0.5 ? Models.Strategy.coop : Models.Strategy.defect;
};
