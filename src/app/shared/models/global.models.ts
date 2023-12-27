/**
 * Global model definitions
 *
 * There are 2 module declarations in this file. 1 is for custom hand coded models, the other is for automatically generated ones from swagger
 *
 * Custom model definitions
 *
 */
export module Models {
  export enum Decision {
    defect,
    coop,
  }

  export interface Strategy {
    name: string;
    fn: (gameState: Models.GameState, opponentNum: number) => Decision;
  }

  export interface Settings {
    gamesCount?: number | null;
    roundsPerGame?: number | null;
    // Points
    pointsForBothCoop?: number | null;
    pointsForBothDefect?: number | null;
    pointsForOneDefect?: number | null;
    pointsForOneCoop?: number | null;
    strategySelection: any;
    /** Each strategy will play against a copy of itself */
    playAgainstSelf: boolean;
    /** Randomly flip values this % of time */
    noise: number;
  }

  export interface StrategySelection {
    enabled: boolean;
    count: number;
    name?: string; // Optional, to keep track of which strategy this is
  }

  export interface GameState {
    round: number;
    playerHistory: Decision[][];
    score: number[];
  }

  export interface Scoring {
    [index: string]: {
      finalScore: number;
      currentPlayerIndex: number;
      numOfPlayers: number;
      games: {
        [index: string]: {
          opponent: string;
          myScore: number;
          opponentScore: number;
          playerHistory: Decision[][];
        };
      };
    };
  }

  export interface Auth {
    data: {
      userGuid: string;
      token: string;
      expires?: string;
      expirationSeconds?: number;
    };
    success: boolean;
    meta: { requestTraceId: string };
  }

  export interface User {
    id: number;
    name?: string;
    username: string;
    email?: string;
    website?: string;
    phone?: string;
  }
}

/**
 * Models automatically generated from swagger with nswagstudio
 *
 * Generate models with NSwagStudio: https://github.com/RSuter/NSwag/wiki/NSwagStudio
 * Make sure to point at the docs url in the top green header
 * IE http://localhost:57462/swagger/docs/v1
 * NOT http://localhost:57462/swagger/ui/index#/

 Config Options:
  - Set namespace to Models
  - TS version 2.7
  - Generate DTO types: Checked
  - Type Style: Interface
  - Null Value: Null
  - Leave everything else blank or unchecked here
  - Remove redundent " | undefined" from each one
 */
export module Models {
  /********************************
   *  BEGIN NSWAG STUDIO COPY/PASTE
   ********************************/
  /********************************
   *  END NSWAG STUDIO COPY/PASTE
   ********************************/
}
