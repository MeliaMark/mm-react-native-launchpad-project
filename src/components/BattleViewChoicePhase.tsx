import React from 'react';
import {Button, Text, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {AvatarStats, BattleState, PlayerData, StatSelection} from '../types';

interface BattleViewProps {
  playerSelection: StatSelection;
  playerData: PlayerData;
  playerChoiceChangeHandler: (stat: StatSelection) => void;
  endChoicePhaseHandler: () => void;
}

export const BattleViewChoicePhase = ({
  playerSelection,
  playerData,
  playerChoiceChangeHandler,
  endChoicePhaseHandler
}: BattleViewProps) => {
  return (
    <View>
      <Text>Select which stat to fight with below</Text>
      <Picker
        selectedValue={playerSelection}
        onValueChange={currentStat => playerChoiceChangeHandler(currentStat)}>
        {Object.entries(playerData.avatarStats).map(([statName, statValue]) => {
          return (
            <Picker.Item
              key={statName}
              label={statName + ': ' + statValue}
              value={statName}
            />
          );
        })}
      </Picker>
      <Button title="FIGHT!" onPress={endChoicePhaseHandler}/>
    </View>
  );
};
