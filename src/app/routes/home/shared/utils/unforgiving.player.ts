import { Models } from '$shared';

export const unforgiving: Models.Strategy = {
  name: 'Unforgiving',
  fn: (gameState: Models.GameState, opponentNum: number): Models.Decision => {
    if (gameState.round === 0) {
      return Models.Decision.coop;
    }
    const opponentDefectsAtLeastOnce = gameState.playerHistory[opponentNum].reduce((prev, b) => {
      return prev === true || b === Models.Decision.defect;
    }, false);

    return opponentDefectsAtLeastOnce ? Models.Decision.defect : Models.Decision.coop;
  },
};
