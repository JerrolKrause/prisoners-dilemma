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

export const titForTwoTat: Models.Strategy = {
  name: 'Tit For Two Tats',
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

export const titForTatForgiving: Models.Strategy = {
  name: 'Tit For Tat Forgiving',
  fn: (gameState: Models.GameState, opponentNum: number): Models.Decision => {
    if (gameState.round === 0) {
      return Models.Decision.coop;
    } else if (getLastItem(gameState.playerHistory[opponentNum]) === Models.Decision.coop || Math.random() >= 0.9) {
      // If last decision was coop, coop. Also, always coop 10% of the time
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
