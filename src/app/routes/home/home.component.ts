import { Models } from '$shared';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { defectEveryThree } from './shared/utils/defect-every-three.player';
import { random } from './shared/utils/random.player';
import { titForTat } from './shared/utils/tit-for-tat.player';

const initialGameState: Models.GameState = {
  round: 0,
  playerHistory: [[], []],
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

  public gameState$ = new BehaviorSubject(initialGameState);

  public players: Models.Player[] = [
    {
      playerName: 'Tit For Tat',
      fn: titForTat,
    },
    {
      playerName: 'Random',
      fn: random,
    },
    {
      playerName: 'Defect Every Three',
      fn: defectEveryThree,
    },
  ];

  public results: any[] = [];

  constructor() {}

  ngOnInit() {
    this.startGame();
  }

  /**
   *
   */
  public startGame() {
    for (let index = 0; index < this.players.length; index++) {
      const currentPlayer = this.players[index];
      const nextPlayer = this.players[index + 1];
      if (!nextPlayer) {
        break;
      }

      const results = this.faceOff(currentPlayer, nextPlayer);
      console.log(currentPlayer.playerName, 'vs', nextPlayer.playerName, ' | Score: ', results.score);
    }
  }

  /**
   *
   * @param player1
   * @param player2
   * @returns
   */
  public faceOff(player1: Models.Player, player2: Models.Player) {
    const gameState: Models.GameState = {
      round: 0,
      playerHistory: [[], []],
      score: [0, 0],
    };
    const result = [];
    for (let index = 0; index < 20; index++) {
      const playerADecision = player1.fn(gameState, 1);
      const playerBDecision = player2.fn(gameState, 0);

      // Scoring
      if (playerADecision === Models.Strategy.coop && playerADecision === playerBDecision) {
        // Both players cooperate
        gameState.score[0] += 3;
        gameState.score[1] += 3;
        result.push(['Both Coop', ...gameState.score]);
      } else if (playerADecision === Models.Strategy.defect && playerADecision === playerBDecision) {
        // Both players defect
        gameState.score[0] += 1;
        gameState.score[1] += 1;
        result.push(['Both Defect', ...gameState.score]);
      } else if (playerADecision === Models.Strategy.coop && playerBDecision === Models.Strategy.defect) {
        // Player A coops, Player B defects
        gameState.score[0] += 0;
        gameState.score[1] += 5;
        result.push(['Player 1 Coops, Player 2 Defects', ...gameState.score]);
      } else if (playerADecision === Models.Strategy.defect && playerBDecision === Models.Strategy.coop) {
        // Player A defects, Player B coops
        gameState.score[0] += 5;
        gameState.score[1] += 0;
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
