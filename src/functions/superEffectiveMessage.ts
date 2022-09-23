import {
  OpponentData,
  PlayerData,
  PlayerSelection,
  StatSelection,
  Winner,
} from '../types';

const getFightDetail = (
  playerSelection: PlayerSelection,
  playerName: string,
  opponentData: OpponentData,
): string => {
  let fightDetailMessage: string;
  if (
    (playerSelection.stat === StatSelection.Stat1 &&
      opponentData.selection.stat === StatSelection.Stat2) ||
    (playerSelection.stat === StatSelection.Stat2 &&
      opponentData.selection.stat === StatSelection.Stat3) ||
    (playerSelection.stat === StatSelection.Stat3 &&
      opponentData.selection.stat === StatSelection.Stat4) ||
    (playerSelection.stat === StatSelection.Stat4 &&
      opponentData.selection.stat === StatSelection.Stat1)
  ) {
    fightDetailMessage = `${opponentData.name} made a super effective attack against ${playerName}`;
  } else if (
    (playerSelection.stat === StatSelection.Stat2 &&
      opponentData.selection.stat === StatSelection.Stat1) ||
    (playerSelection.stat === StatSelection.Stat3 &&
      opponentData.selection.stat === StatSelection.Stat2) ||
    (playerSelection.stat === StatSelection.Stat4 &&
      opponentData.selection.stat === StatSelection.Stat3) ||
    (playerSelection.stat === StatSelection.Stat1 &&
      opponentData.selection.stat === StatSelection.Stat4)
  ) {
    fightDetailMessage = `${playerName} made a super effective attack against ${opponentData.name}`;
  } else {
    fightDetailMessage = 'The fighters choices of tactics were equally matched';
  }
  return fightDetailMessage;
};

export default getFightDetail;
