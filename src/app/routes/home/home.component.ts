import { Models } from '$shared';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, map } from 'rxjs';
import { alwaysCoops } from './shared/utils/always-coops.player';
import { alwaysDefects } from './shared/utils/always-defects.player';
import { titForTat } from './shared/utils/tit-for-tat.player';
import { unforgiving } from './shared/utils/unforgiving.player';

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
  // public decision = Models.Decision;

  public settingsForm!: FormGroup;
  /**
   *  = this.fb.group<Models.Settings>({
    gamesCount: 1,
    roundsPerGame: 200,
    // Points
    pointsForBothCoop: 3,
    pointsForBothDefect: 1,
    pointsForOneDefect: 5,
    pointsForOneCoop: 0,
  });
   */

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

  public strategies: Models.Strategy[] = [titForTat, alwaysDefects, alwaysCoops, unforgiving];

  public strategiesModel = this.strategies.map(s => {
    return [true, 1];
  });

  public playerScore = this.strategies.reduce((acc, player) => {
    acc[player.name] = 0;
    return acc;
  }, {} as Record<string, number>);

  public results: any[] = [];

  constructor(private fb: FormBuilder) {
    this.initializeForm();
  }

  ngOnInit() {
    // Run all players against all other players
    this.startGame();
  }

  /**
   *
   */
  public startGame() {
    console.time('Time Elapsed');
    const settings: Models.Settings = this.settingsForm.value;
    // Create an array with the strategy selection from the form
    const strategies = this.generateSelectedStrategiesArray();

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
    // console.warn(scoring, settings);
    for (let gamesCount = 0; gamesCount < (settings.gamesCount ?? 1); gamesCount++) {
      for (let player1Index = 0; player1Index < strategies.length; player1Index++) {
        for (let player2Index = player1Index; player2Index < strategies.length; player2Index++) {
          const player1 = strategies[player1Index];
          const player2 = strategies[player2Index];
          // No other players after the first player
          if (!player2) {
            break;
          }

          // Get results
          const results = this.faceOff(player1, player2, settings);
          // Tally results into final entity
          // Add opponent into player 1 games entity
          if (!scoring[player1.name].games[player2.name]) {
            scoring[player1.name].games[player2.name] = {
              opponent: player2.name,
              myScore: 0,
              opponentScore: 0,
            };
          }
          // Add opponent into player 2 games entity
          if (!scoring[player2.name].games[player1.name]) {
            scoring[player2.name].games[player1.name] = {
              opponent: player1.name,
              myScore: 0,
              opponentScore: 0,
            };
          }
          // Player 1 results
          console.log(player1.name, scoring[player1.name]);
          if (scoring[player1.name].numOfPlayers > 1) {
            scoring[player1.name].finalScore += results.score[0];
            scoring[player1.name].games[player2.name].myScore += results.score[0];
            scoring[player1.name].games[player2.name].opponentScore += results.score[1];
          } else {
            scoring[player1.name].finalScore += results.score[0];
            scoring[player1.name].games[player2.name].myScore += results.score[0];
            scoring[player1.name].games[player2.name].opponentScore += results.score[1];
          }

          // Player 2 results
          // Prevent double counting score when a player is playing against itself
          if (player1.name !== player2.name) {
            scoring[player2.name].finalScore += results.score[1];
            scoring[player2.name].games[player1.name].myScore += results.score[0];
            scoring[player2.name].games[player1.name].opponentScore += results.score[1];
          }
        }
      }
    }
    console.warn(scoring);
    this._scoring$.next(scoring);
    console.timeEnd('Time Elapsed');
  }

  /**
   *
   * @param player1
   * @param player2
   * @returns
   */
  public faceOff(player1: Models.Strategy, player2: Models.Strategy, settings: Models.Settings) {
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
      if (playerADecision === Models.Decision.coop && playerBDecision === Models.Decision.coop) {
        // Both players cooperate
        gameState.score[0] += settings.pointsForBothCoop ?? 3;
        gameState.score[1] += settings.pointsForBothCoop ?? 3;
        result.push(['Both Coop', ...gameState.score]);
      } else if (playerADecision === Models.Decision.defect && playerBDecision === Models.Decision.defect) {
        // Both players defect
        gameState.score[0] += settings.pointsForBothDefect ?? 1;
        gameState.score[1] += settings.pointsForBothDefect ?? 1;
        result.push(['Both Defect', ...gameState.score]);
      } else if (playerADecision === Models.Decision.coop && playerBDecision === Models.Decision.defect) {
        // Player A coops, Player B defects
        gameState.score[0] += settings.pointsForOneCoop ?? 0;
        gameState.score[1] += settings.pointsForOneDefect ?? 5;
        result.push(['Player 1 Coops, Player 2 Defects', ...gameState.score]);
      } else if (playerADecision === Models.Decision.defect && playerBDecision === Models.Decision.coop) {
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

  private initializeForm(): void {
    this.settingsForm = this.fb.group<Models.Settings>({
      gamesCount: 1,
      roundsPerGame: 20,
      pointsForBothCoop: 3,
      pointsForBothDefect: 1,
      pointsForOneDefect: 5,
      pointsForOneCoop: 0,
      strategySelection: this.fb.array(this.strategies.map(strategy => this.createStrategyFormGroup(strategy))),
    });
  }

  private createStrategyFormGroup(strategy: Models.Strategy): FormGroup {
    return this.fb.group({
      enabled: true,
      count: 1,
      name: strategy.name, // Optional, to keep track of which strategy this is
    });
  }

  private generateSelectedStrategiesArray(): Models.Strategy[] {
    const strategySelections: Models.StrategySelection[] = this.settingsForm.get('strategySelection')?.value;
    let selectedStrategies: Models.Strategy[] = [];

    strategySelections.forEach((selection, index) => {
      if (selection.enabled && selection.count > 0) {
        for (let i = 0; i < selection.count; i++) {
          selectedStrategies.push(this.strategies[index]);
        }
      }
    });

    return selectedStrategies;
  }

  get strategySelection(): FormArray {
    return this.settingsForm.get('strategySelection') as FormArray;
  }

  ngOnDestroy() {}
}
