import { Models } from '$shared';

// Like tit for tat
// Coops on first move, imitates previous move but 10% of time defects

export const sneaky: Models.Strategy = {
  name: 'Sneaky',
  fn: (gameState: Models.GameState, opponentNum: number): Models.Decision => {
    if (gameState.round === 0) {
      return Models.Decision.coop;
    } else if (Math.random() >= 0.9) {
      // Defect randomly 10% of the time
      return Models.Decision.defect;
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
