import {PlayerSelection, StatSelection, Winner} from '../types';

const determineWinner = (
  playerSelection: PlayerSelection,
  opponentSelection: PlayerSelection,
): Winner => {
  let adjustedPlayerStat: number = playerSelection.value;
  if (
    playerSelection.stat === StatSelection.Stat1 &&
    opponentSelection.stat === StatSelection.Stat2
  ) {
    adjustedPlayerStat /= 2;
  } else if (
    playerSelection.stat === StatSelection.Stat2 &&
    opponentSelection.stat === StatSelection.Stat3
  ) {
    adjustedPlayerStat /= 2;
  } else if (
    playerSelection.stat === StatSelection.Stat3 &&
    opponentSelection.stat === StatSelection.Stat4
  ) {
    adjustedPlayerStat /= 2;
  } else if (
    playerSelection.stat === StatSelection.Stat4 &&
    opponentSelection.stat === StatSelection.Stat1
  ) {
    adjustedPlayerStat /= 2;
  } else if (
    playerSelection.stat === StatSelection.Stat2 &&
    opponentSelection.stat === StatSelection.Stat1
  ) {
    adjustedPlayerStat *= 2;
  } else if (
    playerSelection.stat === StatSelection.Stat3 &&
    opponentSelection.stat === StatSelection.Stat2
  ) {
    adjustedPlayerStat *= 2;
  } else if (
    playerSelection.stat === StatSelection.Stat4 &&
    opponentSelection.stat === StatSelection.Stat3
  ) {
    adjustedPlayerStat *= 2;
  } else if (
    playerSelection.stat === StatSelection.Stat1 &&
    opponentSelection.stat === StatSelection.Stat4
  ) {
    adjustedPlayerStat *= 2;
  }

  if (adjustedPlayerStat === opponentSelection.value) {
    return Winner.Draw;
  } else {
    return adjustedPlayerStat > opponentSelection.value
      ? Winner.Player
      : Winner.Opponent;
  }
};

export default determineWinner;
