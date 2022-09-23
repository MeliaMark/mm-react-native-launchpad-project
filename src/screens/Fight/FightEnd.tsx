import React from 'react';
import {View, Text, Button} from 'react-native';
import getFightDetail from '../../functions/superEffectiveMessage';
import {OpponentData, PlayerData, PlayerSelection, Winner} from '../../types';

interface FightEndProps {
  winner: Winner;
  opponentData?: OpponentData;
  playerData: PlayerData;
  playerSelection: PlayerSelection;
  resetFight: () => void;
}

export const FightEnd = ({
  winner,
  opponentData,
  playerData,
  playerSelection,
  resetFight,
}: FightEndProps) => {
  if (!opponentData) {
    return (
      <View>
        <Text>No opponentData found</Text>
        <Button title="Back" onPress={resetFight} />
      </View>
    );
  }
  const fightDetailMessage = getFightDetail(
    playerSelection,
    playerData.name,
    opponentData,
  );
  const winnerMessage = getWinnerMessage(winner, opponentData, playerData);
  return (
    <View>
      <Text>Fight End</Text>
      <Text>{fightDetailMessage}</Text>
      <Text>Result: {winnerMessage}</Text>
      <Button title="Fight again" onPress={resetFight} />
    </View>
  );
};

const getWinnerMessage = (
  winner: Winner,
  opponentData: OpponentData,
  playerData: PlayerData,
): string => {
  let winnerMessage: string;
  if (winner === Winner.Undecided) {
    winnerMessage = "The fight isn't over yet, how did you get here?";
  } else if (winner === Winner.Draw) {
    winnerMessage = "It's a tie!";
  } else {
    const winnerName =
      winner === Winner.Player ? playerData.name : opponentData.name;
    winnerMessage = `${winnerName} wins!`;
  }
  return winnerMessage;
};
