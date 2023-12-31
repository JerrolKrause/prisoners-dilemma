import { Models } from '$shared';

export const titForTat: Models.Strategy = {
  name: 'Tit For Tat',
  description: "This strategy starts with cooperation and then mimics the opponent's previous move in subsequent rounds.",
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
  description: '',
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
  description:
    "Similar to Tit For Tat, this strategy cooperates initially and then usually copies the opponent's last move but occasionally forgives defection and cooperates instead.",
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
