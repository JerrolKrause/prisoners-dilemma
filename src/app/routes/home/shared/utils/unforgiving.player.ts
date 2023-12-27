import { Models } from '$shared';

export const unforgiving: Models.Strategy = {
  name: 'Unforgiving',
  fn: (gameState: Models.GameState, opponentNum: number): Models.Decision => {
    // Attempts to cooperate at first round
    if (gameState.round === 0) {
      return Models.Decision.coop;
    }
    // Checks if the opponent has defected at least once, always defect if so
    const opponentDefectsAtLeastOnce = gameState.playerHistory[opponentNum].reduce((prev, b) => {
      return prev === true || b === Models.Decision.defect;
    }, false);

    return opponentDefectsAtLeastOnce ? Models.Decision.defect : Models.Decision.coop;
  },
};
