import { Models } from '$shared';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BehaviorSubject, map } from 'rxjs';
import { alwaysCoops } from './shared/utils/always-coops.player';
import { alwaysDefects } from './shared/utils/always-defects.player';
import { titForTat } from './shared/utils/tit-for-tat.player';

const initialGameState: Models.GameState = {
  round: 0,
  playerHistory: [],
  score: [0, 0],
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, OnDestroy {
  public strategy = Models.Strategy;

  public settingsForm = this.fb.group<Models.Settings>({
    gamesCount: 1,
    roundsPerGame: 200,
    // Points
    pointsForBothCoop: 3,
    pointsForBothDefect: 1,
    pointsForOneDefect: 5,
    pointsForOneCoop: 0,
  });

  public gameState$ = new BehaviorSubject(initialGameState);
  public _scoring$ = new BehaviorSubject<Models.Scoring | null>(null);
  public scoring$ = this._scoring$.pipe(
    map(scores => {
      if (!scores) {
        return null;
      }
      return Object.entries(scores)
        .map(score => ({
          label: score[0],
          finalScore: score[1].finalScore,
          opponents: Object.entries(score[1].games).map(opponent => ({
            label: opponent[0],
            myScore: opponent[1].myScore,
            opponentScore: opponent[1].opponentScore,
          })),
        }))
        .sort((a, b) => b.finalScore - a.finalScore);
    }),
  );

  public players: Models.Player[] = [
    {
      playerName: 'Tit For Tat',
      fn: titForTat,
    },
    /**
    {
      playerName: 'Random 50% Defect',
      fn: random50,
    },
    {
      playerName: 'Random 33% Defect',
      fn: random33,
    },
    {
      playerName: 'Random 66% Defect',
      fn: random66,
    },
    {
      playerName: 'Defect Every Three',
      fn: defectEveryThree,
    }, */
    {
      playerName: 'Always Coops',
      fn: alwaysCoops,
    },
    {
      playerName: 'Always Defects',
      fn: alwaysDefects,
    },
  ];

  public playerScore = this.players.reduce((acc, player) => {
    acc[player.playerName] = 0;
    return acc;
  }, {} as Record<string, number>);

  public results: any[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.scoring$.subscribe(x => console.log(x));
    // Run all players against all other players
    this.startGame();

    /**
    // Run 2 specific players
    const finalScore = [0, 0];
    const player1 = this.players[0];
    const player2 = this.players[3];
    for (let index = 0; index < 1; index++) {
      const temp = this.faceOff(player1, player2);
      finalScore[0] += temp.score[0];
      finalScore[1] += temp.score[1];
    }
    console.log('Face Off:', player1.playerName + ' vs ' + player2.playerName, finalScore);
     */
  }

  /**
   *
   */
  public startGame() {
    console.time('Time Elapsed');
    const settings: Models.Settings = this.settingsForm.value;
    // Generate final scoring entity
    const scoring = this.players.reduce((score, player) => {
      return {
        ...score,
        [player.playerName]: {
          finalScore: 0,
          games: {},
        },
      };
    }, {} as Models.Scoring);
    // console.warn(scoring, settings);
    for (let gamesCount = 0; gamesCount < (settings.gamesCount ?? 1); gamesCount++) {
      for (let player1Index = 0; player1Index < this.players.length; player1Index++) {
        for (let player2Index = player1Index; player2Index < this.players.length; player2Index++) {
          const player1 = this.players[player1Index];
          const player2 = this.players[player2Index];
          // No other players after the first player
          if (!player2) {
            break;
          }

          // Get results
          const results = this.faceOff(player1, player2, settings);
          // Tally results into final entity
          // Add opponent into player 1 games entity
          if (!scoring[player1.playerName].games[player2.playerName]) {
            scoring[player1.playerName].games[player2.playerName] = {
              opponent: player2.playerName,
              myScore: 0,
              opponentScore: 0,
            };
          }
          // Add opponent into player 2 games entity
          if (!scoring[player2.playerName].games[player1.playerName]) {
            scoring[player2.playerName].games[player1.playerName] = {
              opponent: player1.playerName,
              myScore: 0,
              opponentScore: 0,
            };
          }

          // Player 1 results
          scoring[player1.playerName].finalScore += results.score[0];
          scoring[player1.playerName].games[player2.playerName].myScore += results.score[0];
          scoring[player1.playerName].games[player2.playerName].opponentScore += results.score[1];

          // Player 2 results
          // Prevent double counting score when a player is playing against itself
          if (player1.playerName !== player2.playerName) {
            scoring[player2.playerName].finalScore += results.score[1];
            scoring[player2.playerName].games[player1.playerName].myScore += results.score[0];
            scoring[player2.playerName].games[player1.playerName].opponentScore += results.score[1];
          }

          console.log(player1.playerName, 'vs', player2.playerName, ' | Score: ', results.score);
          // this.playerScore[player1.playerName] += results.score[0];
          // this.playerScore[player2.playerName] += results.score[1];
        }
      }
      console.warn(scoring);
      this._scoring$.next(scoring);
      // console.log(this.playerScore);
    }
    console.timeEnd('Time Elapsed');
  }

  /**
   *
   * @param player1
   * @param player2
   * @returns
   */
  public faceOff(player1: Models.Player, player2: Models.Player, settings: Models.Settings) {
    const gameState: Models.GameState = {
      round: 0,
      playerHistory: [[], []],
      score: [0, 0],
    };
    const result = [];

    for (let index = 0; index < (settings.roundsPerGame ?? 200); index++) {
      const playerADecision = player1.fn(gameState, 1);
      const playerBDecision = player2.fn(gameState, 0);

      // Scoring
      if (playerADecision === Models.Strategy.coop && playerBDecision === Models.Strategy.coop) {
        // Both players cooperate
        gameState.score[0] += settings.pointsForBothCoop ?? 3;
        gameState.score[1] += settings.pointsForBothCoop ?? 3;
        result.push(['Both Coop', ...gameState.score]);
      } else if (playerADecision === Models.Strategy.defect && playerBDecision === Models.Strategy.defect) {
        // Both players defect
        gameState.score[0] += settings.pointsForBothDefect ?? 1;
        gameState.score[1] += settings.pointsForBothDefect ?? 1;
        result.push(['Both Defect', ...gameState.score]);
      } else if (playerADecision === Models.Strategy.coop && playerBDecision === Models.Strategy.defect) {
        // Player A coops, Player B defects
        gameState.score[0] += settings.pointsForOneCoop ?? 0;
        gameState.score[1] += settings.pointsForOneDefect ?? 5;
        result.push(['Player 1 Coops, Player 2 Defects', ...gameState.score]);
      } else if (playerADecision === Models.Strategy.defect && playerBDecision === Models.Strategy.coop) {
        // Player A defects, Player B coops
        gameState.score[0] += settings.pointsForOneDefect ?? 5;
        gameState.score[1] += settings.pointsForOneCoop ?? 0;
        result.push(['Player 1 Defects, Player 2 Coops', ...gameState.score]);
      } else {
        console.error('Unknown condition');
      }

      gameState.round++;
      gameState.playerHistory[0].push(playerADecision);
      gameState.playerHistory[1].push(playerBDecision);
    }
    this.gameState$.next(gameState);

    return gameState;
  }

  ngOnDestroy() {}
}
