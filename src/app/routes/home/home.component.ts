import { Models } from '$shared';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, map, tap } from 'rxjs';
import { alwaysCoops } from './shared/utils/always-coops.player';
import { alwaysDefects } from './shared/utils/always-defects.player';
import { random } from './shared/utils/random.player';
import { sneaky } from './shared/utils/sneaky.player';
import { titForTat, titForTatForgiving } from './shared/utils/tit-for-tat.player';
import { unforgiving } from './shared/utils/unforgiving.player';

const localStorageKey = 'pd-settings';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, OnDestroy {
  public decision = Models.Decision;

  public settingsForm!: FormGroup;

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
          opponents: Object.entries(score[1].games)
            .map(opponent => {
              return {
                label: opponent[0],
                myScore: opponent[1].myScore,
                opponentScore: opponent[1].opponentScore,
                playerHistory: opponent[1].playerHistory,
                spread: opponent[1].spread,
              };
            })
            .sort((a, b) => b.spread - a.spread),
        }))
        .sort((a, b) => b.finalScore - a.finalScore);
    }),
    tap(x => console.warn(x)),
  );

  public strategies: Models.Strategy[] = [titForTat, titForTatForgiving, alwaysDefects, alwaysCoops, unforgiving, sneaky, random];

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
    this.startGame2();
  }

  public startGame2() {
    const settings: Models.Settings = this.settingsForm.value;
    window.localStorage.setItem(localStorageKey, JSON.stringify(settings));
    // Create an array with the strategy selection from the form
    // const strategies = this.generateSelectedStrategiesArray();

    /**
    if (window.Worker) {
      // Create a new web worker
      // src\assets\workers\prisoners-dilemma.worker.js
      const myWorker = new Worker('/assets/workers/prisoners-dilemma.worker.js');

      // Send data to the web worker
      myWorker.postMessage(
        JSON.stringify({
          strategies: strategies,
          settings: settings,
        }),
      );

      // Event listener for messages from the web worker
      myWorker.onmessage = function (e) {
        console.log('Message received from worker:', e.data);
      };

      // Listen for errors from the web worker
      myWorker.onerror = function (e) {
        console.error('Error from worker:', e);
      };
    } else {
      console.log("Your browser doesn't support web workers.");
    }
     */
  }

  /**
   *
   */
  public startGame() {
    console.time('Time Elapsed');
    const settings: Models.Settings = this.settingsForm.value;
    window.localStorage.setItem(localStorageKey, JSON.stringify(settings));
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
          const results = this.faceOff(player1, player2, settings);
          // Tally results into final entity
          // Add opponent into player 1 games entity
          if (!scoring[player1.name].games[player2.name]) {
            scoring[player1.name].games[player2.name] = {
              opponent: player2.name,
              myScore: 0,
              opponentScore: 0,
              playerHistory: [],
              spread: 0,
            };
          }
          // Add opponent into player 2 games entity
          if (!scoring[player2.name].games[player1.name]) {
            scoring[player2.name].games[player1.name] = {
              opponent: player1.name,
              myScore: 0,
              opponentScore: 0,
              playerHistory: [],
              spread: 0,
            };
          }
          // Player 1 results
          // TODO: Score each player separately?
          scoring[player1.name].finalScore += results.score[0];
          scoring[player1.name].games[player2.name].myScore += results.score[0];
          scoring[player1.name].games[player2.name].opponentScore += results.score[1];
          scoring[player1.name].games[player2.name].playerHistory = results.playerHistory;
          scoring[player1.name].games[player2.name].spread =
            scoring[player1.name].games[player2.name].myScore - scoring[player1.name].games[player2.name].opponentScore;
          // Player 2 results
          // Prevent double counting score when a player is playing against itself
          if (player1.name !== player2.name) {
            scoring[player2.name].finalScore += results.score[1];
            scoring[player2.name].games[player1.name].myScore += results.score[0];
            scoring[player2.name].games[player1.name].opponentScore += results.score[1];
            scoring[player2.name].games[player1.name].playerHistory = [results.playerHistory[1], results.playerHistory[0]];
            scoring[player2.name].games[player1.name].spread =
              scoring[player2.name].games[player1.name].opponentScore - scoring[player2.name].games[player1.name].myScore;
          }
        }
      }
    }
    // console.warn('Scoring', scoring);
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

    // Include any random rounds
    const roundsPerGame = (settings.roundsPerGame ?? 0) + this.getRandomNumber(0, settings.randomRounds ?? 0);

    for (let index = 0; index < (roundsPerGame ?? 200); index++) {
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

  private initializeForm(): void {
    this.settingsForm = this.fb.group<Models.Settings>({
      gamesCount: 1,
      roundsPerGame: 200,
      randomRounds: 10,
      pointsForBothCoop: 3,
      pointsForBothDefect: 1,
      pointsForOneDefect: 5,
      pointsForOneCoop: 0,
      playAgainstSelf: true,
      noise: 0,
      strategySelection: this.fb.array(this.strategies.map(strategy => this.createStrategyFormGroup(strategy))),
    });
    const settingsStr = window.localStorage.getItem(localStorageKey);
    if (settingsStr) {
      try {
        const settings = JSON.parse(settingsStr) as Models.Settings;
        this.settingsForm.patchValue(settings);
      } catch (err) {
        console.error('Unable to get value from localstorage', err);
      }
    }
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

  public getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  ngOnDestroy() {}
}
