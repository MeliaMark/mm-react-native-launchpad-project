import React from 'react';
import {Text, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {AvatarStats, BattleState, PlayerData} from '../types';

interface BattleViewProps {
  playerData: PlayerData;
  playerChoiceChangeHandler: () => {};
}

export const BattleViewChoicePhase = ({
  playerData,
  playerChoiceChangeHandler,
}: BattleViewProps) => {
  return (
    <View>
      <Picker
        selectedValue={battleState.choicePhase.playerSelection}
        onValueChange={playerChoiceChangeHandler}>
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
    </View>
  );
};