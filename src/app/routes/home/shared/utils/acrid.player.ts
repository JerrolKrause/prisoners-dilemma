import { Models } from '$shared';

/**
 * Defines the 'Acrid' strategy for the Prisoner's Dilemma game.
 * This strategy cooperates in the first two rounds and defects in the next two,
 * repeating this pattern throughout the game.
 */
export const acrid: Models.Strategy = {
  name: 'Acrid',
  description: 'Cooperates on first 2 rounds, defects on subsequent 2 rounds, repeat.',

  /**
   * The function to determine the strategy's decision for each round.
   *
   * @param gameState - The current state of the game, including round number and player history.
   * @param opponentNum - The number representing the opponent.
   * @param myNum - The number representing the current player.
   * @returns The decision of cooperation or defection for the current round.
   */
  fn: (gameState: Models.GameState, opponentNum: number, myNum: number): Models.Decision => {
    // Calculate the current round number from the game state.
    const currentRound = gameState.round;

    // Determine the position in the 4-round cycle (0, 1, 2, 3).
    const cyclePosition = currentRound % 4;

    // Cooperate in the first two rounds of each cycle (positions 1 and 2).
    // Defect in the third and fourth rounds (positions 0 and 3).
    if (cyclePosition === 0 || cyclePosition === 1) {
      return Models.Decision.coop;
    } else {
      return Models.Decision.defect;
    }
  },
};
