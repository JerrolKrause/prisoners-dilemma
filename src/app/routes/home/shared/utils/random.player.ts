import { Models } from '$shared';

export const random50 = (gameState: Models.GameState, opponentNum: number): Models.Strategy => {
  // return Models.Strategy.defect;
  return Math.random() >= 0.5 ? Models.Strategy.coop : Models.Strategy.defect;
};

export const random33 = (gameState: Models.GameState, opponentNum: number): Models.Strategy => {
  // return Models.Strategy.defect;
  return Math.random() >= 0.33 ? Models.Strategy.coop : Models.Strategy.defect;
};

export const random66 = (gameState: Models.GameState, opponentNum: number): Models.Strategy => {
  // return Models.Strategy.defect;
  return Math.random() >= 0.66 ? Models.Strategy.coop : Models.Strategy.defect;
};
