import { Models } from '$shared';

export const alwaysCoops: Models.Strategy = {
  name: 'Always Cooperates',
  fn: (gameState: Models.GameState, opponentNum: number): Models.Decision => Models.Decision.coop,
};
