import { Models } from '$shared';

export const random: Models.Strategy = {
  name: 'Random 50%',
  fn: (gameState: Models.GameState, opponentNum: number): Models.Decision => (Math.random() >= 0.5 ? Models.Decision.coop : Models.Decision.defect),
};
