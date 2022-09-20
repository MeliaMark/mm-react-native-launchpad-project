import React, {SetStateAction} from 'react';

export type SetState<T> = React.Dispatch<SetStateAction<T>>;

export type UseState<T> = [T, React.Dispatch<SetStateAction<T>>];

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

export enum StatSelection {
  Stat1 = 'stat1',
  Stat2 = 'stat2',
  Stat3 = 'stat3',
  Stat4 = 'stat4',
}

export interface BattleState {
  choicePhase: {
    playerSelection: StatSelection;
    opponentSelection: StatSelection;
    phaseComplete: boolean;
  };
  endPhase: {
    winner: 'player' | 'opponent' | undefined;
    phaseComplete: boolean;
  };
}
