import { Models } from '$shared';

export const alwaysCoops: Models.Strategy = {
  name: 'Always Cooperates',
  description: `This strategy cooperates in every round, no matter what the opponent does.`,
  fn: (gameState: Models.GameState, opponentNum: number): Models.Decision => Models.Decision.coop,
};
