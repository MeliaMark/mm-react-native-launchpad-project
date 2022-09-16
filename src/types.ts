import React, {SetStateAction} from 'react';

export type SetState<T> = React.Dispatch<SetStateAction<T>>;

export interface AvatarStats {
  stat1: number;
  stat2: number;
  stat3: number;
  stat4: number;
}

export interface PlayerData {
  name: string;
  avatarUri: string;
  avatarStats: AvatarStats;
}

export interface BattleState {
  choicePhase: {
    playerSelection: 'stat1' | 'stat2' | 'stat3' | 'stat4' | undefined;
    opponentSelection: 'stat1' | 'stat2' | 'stat3' | 'stat4' | undefined;
    phaseComplete: boolean;
  };
  endPhase: {
    winner: 'player' | 'opponent' | undefined;
    phaseComplete: boolean;
  };
}
