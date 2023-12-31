import { Models } from '$shared';

export const random: Models.Strategy = {
  name: 'Random 50%',
  description: `This strategy makes decisions randomly, with a 50% chance of cooperating and a 50% chance of defecting in each round.`,
  fn: (gameState: Models.GameState, opponentNum: number): Models.Decision => (Math.random() >= 0.5 ? Models.Decision.coop : Models.Decision.defect),
};
