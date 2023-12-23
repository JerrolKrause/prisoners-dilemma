import { Models } from '$shared';

export const defectEveryThree = (gameState: Models.GameState, opponentNum: number): Models.Strategy => {
  if (gameState.round % 3 === 0) {
    return Models.Strategy.defect;
  }
  return Models.Strategy.coop;
};
