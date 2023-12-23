/**
 * Global model definitions
 *
 * There are 2 module declarations in this file. 1 is for custom hand coded models, the other is for automatically generated ones from swagger
 *
 * Custom model definitions
 *
 */
export module Models {
  export enum Strategy {
    defect,
    coop,
  }

  export interface Player {
    playerName: string;
    fn: (gameState: Models.GameState, opponentNum: number) => Strategy;
  }

  export interface Scoring {
    players: Record<string, string>;
  }

  export interface GameState {
    round: number;
    playerHistory: Strategy[][];
    score: number[];
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
