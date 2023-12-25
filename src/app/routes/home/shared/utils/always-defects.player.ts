import { Models } from '$shared';

export const alwaysDefects: Models.Strategy = {
  name: 'Always Defects',
  fn: (gameState: Models.GameState, opponentNum: number): Models.Decision => Models.Decision.defect,
};
