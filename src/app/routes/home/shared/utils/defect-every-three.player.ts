import { Models } from '$shared';

export const defectEveryThree = (gameState: Models.GameState, opponentNum: number): Models.Decision => {
  if (gameState.round % 3 === 0) {
    return Models.Decision.defect;
  }
  return Models.Decision.coop;
};
