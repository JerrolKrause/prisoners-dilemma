import { Models } from '$shared';

export const acrid: Models.Strategy = {
  name: 'Acrid',
  description: 'Randomly defects/cooperates on first round and always does opposite on subsequent rounds',
  fn: (gameState: Models.GameState, opponentNum: number, myNum: number): Models.Decision => {
    if (gameState.round === 0) {
      return Math.random() >= 0.5 ? Models.Decision.coop : Models.Decision.defect;
    }
    console.log(opponentNum);
    return getLastItem(gameState.playerHistory[myNum]) === Models.Decision.defect ? Models.Decision.coop : Models.Decision.defect;
  },
};

const getLastItem = <t>(array: t[]) => {
  return array[array.length - 1];
};
