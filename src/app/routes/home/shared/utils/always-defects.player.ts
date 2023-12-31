import { Models } from '$shared';

export const alwaysDefects: Models.Strategy = {
  name: 'Always Defects',
  description: "This strategy defects in every round, regardless of the opponent's previous or current moves.",
  fn: (gameState: Models.GameState, opponentNum: number): Models.Decision => Models.Decision.defect,
};
