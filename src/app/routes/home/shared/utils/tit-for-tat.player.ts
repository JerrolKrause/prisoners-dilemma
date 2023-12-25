import { Models } from '$shared';

export const titForTat: Models.Strategy = {
  name: 'Tit For Tat',
  fn: (gameState: Models.GameState, opponentNum: number): Models.Decision => {
    if (gameState.round === 0) {
      return Models.Decision.coop;
    } else if (getLastItem(gameState.playerHistory[opponentNum]) === Models.Decision.coop) {
      return Models.Decision.coop;
    } else if (getLastItem(gameState.playerHistory[opponentNum]) === Models.Decision.defect) {
      return Models.Decision.defect;
    }
    console.error('Unknown condition');
    return Models.Decision.coop;
  },
};

const getLastItem = <t>(array: t[]) => {
  return array[array.length - 1];
};
