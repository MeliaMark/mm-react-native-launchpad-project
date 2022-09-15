import React from 'react';
import {Text, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {AvatarStats, BattleState, PlayerData} from '../types';

interface BattleViewProps {
  battleState: BattleState;
  playerData: PlayerData;
  playerChoiceChangeHandler: () => {};
}

export const BattleView = ({
  battleState,
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
