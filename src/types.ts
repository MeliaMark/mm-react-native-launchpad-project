import React, {SetStateAction} from 'react';

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
  wins: number;
  losses: number;
  trophies: string[]
}

export enum StatSelection {
  Stat1 = 'stat1',
  Stat2 = 'stat2',
  Stat3 = 'stat3',
  Stat4 = 'stat4',
}

export interface PlayerSelection {
  stat: StatSelection;
  value: number;
}

export interface OpponentData {
  name: string;
  avatarUri: string;
  selection: PlayerSelection
}

export enum Winner {
  Player = 'player',
  Opponent = 'opponent',
  Draw = 'draw',
  Undecided = 'undecided',
}

export interface SavedPlayer {
  id: string,
  email: string
}
