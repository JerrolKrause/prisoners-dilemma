import { Models } from '$shared';

export const acrid: Models.Strategy = {
  name: 'Acrid',
  description: 'Chooses randomly 50% of the time. Always retaliates. Always defects the last 5 rounds of the game.',
  fn: (gameState: Models.GameState, opponentNum: number): Models.Decision => {
    if (gameState.round === 0) {
      return Models.Decision.coop;
    } else if (getLastItem(gameState.playerHistory[opponentNum]) === Models.Decision.defect) {
      return Models.Decision.defect;
    } else if (gameState.round >= 195) {
      return Models.Decision.defect;
    }
    console.error('Unknown condition');
    return Math.random() >= 0.5 ? Models.Decision.coop : Models.Decision.defect;
  },
};

const getLastItem = <t>(array: t[]) => {
  return array[array.length - 1];
};
