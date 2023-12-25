import { Models } from '$shared';

export const random50 = (gameState: Models.GameState, opponentNum: number): Models.Decision => {
  // return Models.Decision.defect;
  return Math.random() >= 0.5 ? Models.Decision.coop : Models.Decision.defect;
};

export const random33 = (gameState: Models.GameState, opponentNum: number): Models.Decision => {
  // return Models.Decision.defect;
  return Math.random() >= 0.33 ? Models.Decision.coop : Models.Decision.defect;
};

export const random66 = (gameState: Models.GameState, opponentNum: number): Models.Decision => {
  // return Models.Decision.defect;
  return Math.random() >= 0.66 ? Models.Decision.coop : Models.Decision.defect;
};
