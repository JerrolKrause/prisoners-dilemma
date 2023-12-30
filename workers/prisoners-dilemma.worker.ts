import { Models } from '../src/app/shared';

// Event listener for messages from the main thread
onmessage = function (e) {
  console.log('Worker: Message received from main script 1', e);
  const data = JSON.parse(e.data);
  console.log(data);
  const strategies = data.strategies as Models.Strategy[];
  const settings = data.settings as Models.Settings;

  // Generate final scoring entity
  const scoring = strategies.reduce((score, player) => {
    return {
      ...score,
      [player.name]: {
        finalScore: 0,
        currentPlayerIndex: 0,
        numOfPlayers: score[player.name]?.numOfPlayers ? score[player.name].numOfPlayers + 1 : 1,
        games: {},
      },
    };
  }, {} as Models.Scoring);
  // If playing against self is set, starter earlier in index
  const player2StartingIndex = settings.playAgainstSelf ? 0 : 1;
  for (let gamesCount = 0; gamesCount < (settings.gamesCount ?? 1); gamesCount++) {
    for (let player1Index = 0; player1Index < strategies.length; player1Index++) {
      for (let player2Index = player1Index + player2StartingIndex; player2Index < strategies.length; player2Index++) {
        const player1 = strategies[player1Index];
        const player2 = strategies[player2Index];
        // No other players after the first player
        if (!player2) {
          break;
        }

        // Get results
        const results = faceOff(player1, player2, settings);
        // Tally results into final entity
        // Add opponent into player 1 games entity
        if (!scoring[player1.name].games[player2.name]) {
          scoring[player1.name].games[player2.name] = {
            opponent: player2.name,
            myScore: 0,
            opponentScore: 0,
            playerHistory: [],
          };
        }
        // Add opponent into player 2 games entity
        if (!scoring[player2.name].games[player1.name]) {
          scoring[player2.name].games[player1.name] = {
            opponent: player1.name,
            myScore: 0,
            opponentScore: 0,
            playerHistory: [],
          };
        }
        // Player 1 results
        if (scoring[player1.name].numOfPlayers > 1) {
          scoring[player1.name].finalScore += results.score[0];
          scoring[player1.name].games[player2.name].myScore += results.score[0];
          scoring[player1.name].games[player2.name].opponentScore += results.score[1];
          scoring[player1.name].games[player2.name].playerHistory = results.playerHistory;
        } else {
          scoring[player1.name].finalScore += results.score[0];
          scoring[player1.name].games[player2.name].myScore += results.score[0];
          scoring[player1.name].games[player2.name].opponentScore += results.score[1];
          scoring[player1.name].games[player2.name].playerHistory = results.playerHistory;
        }

        // Player 2 results
        // Prevent double counting score when a player is playing against itself
        if (player1.name !== player2.name) {
          scoring[player2.name].finalScore += results.score[1];
          scoring[player2.name].games[player1.name].myScore += results.score[0];
          scoring[player2.name].games[player1.name].opponentScore += results.score[1];
          scoring[player2.name].games[player1.name].playerHistory = [results.playerHistory[1], results.playerHistory[0]];
        }
      }
    }
  }

  // Send data back to the main thread
  postMessage(scoring);
};

function faceOff(player1: Models.Strategy, player2: Models.Strategy, settings: Models.Settings) {
  const gameState: Models.GameState = {
    round: 0,
    playerHistory: [[], []],
    score: [0, 0],
  };

  for (let index = 0; index < (settings.roundsPerGame ?? 200); index++) {
    let playerADecision = player1.fn(gameState, 1);
    let playerBDecision = player2.fn(gameState, 0);
    // Add support for noise, IE random results based on the percentage specified by the user
    // Support for noise in player A's decision
    if (Math.random() < settings.noise / 100) {
      playerADecision = playerADecision === Models.Decision.coop ? Models.Decision.defect : Models.Decision.coop;
    }

    // Support for noise in player B's decision
    if (Math.random() < settings.noise / 100) {
      playerBDecision = playerBDecision === Models.Decision.coop ? Models.Decision.defect : Models.Decision.coop;
    }

    // Scoring
    if (playerADecision === Models.Decision.coop && playerBDecision === Models.Decision.coop) {
      // Both players cooperate
      gameState.score[0] += settings.pointsForBothCoop ?? 3;
      gameState.score[1] += settings.pointsForBothCoop ?? 3;
    } else if (playerADecision === Models.Decision.defect && playerBDecision === Models.Decision.defect) {
      // Both players defect
      gameState.score[0] += settings.pointsForBothDefect ?? 1;
      gameState.score[1] += settings.pointsForBothDefect ?? 1;
    } else if (playerADecision === Models.Decision.coop && playerBDecision === Models.Decision.defect) {
      // Player A coops, Player B defects
      gameState.score[0] += settings.pointsForOneCoop ?? 0;
      gameState.score[1] += settings.pointsForOneDefect ?? 5;
    } else if (playerADecision === Models.Decision.defect && playerBDecision === Models.Decision.coop) {
      // Player A defects, Player B coops
      gameState.score[0] += settings.pointsForOneDefect ?? 5;
      gameState.score[1] += settings.pointsForOneCoop ?? 0;
    } else {
      console.error('Unknown condition', playerADecision, playerBDecision);
    }

    gameState.round++;
    gameState.playerHistory[0].push(playerADecision);
    gameState.playerHistory[1].push(playerBDecision);
  }

  return gameState;
}
