import React from 'react';
import {View, Text, Button} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {PlayerData, PlayerSelection, StatSelection} from '../../types';

interface FightStartProps {
  playerSelection: PlayerSelection;
  playerData: PlayerData;
  changeHandler: (stat: StatSelection) => void;
  commenceScanningHandler: (playerScanningFirst: boolean) => void;
}

export const FightStart = ({
  playerSelection,
  playerData,
  changeHandler,
  commenceScanningHandler,
}: FightStartProps) => {
  return (
    <View>
      <Text>Select which stat to fight with below</Text>
      <Picker
        selectedValue={playerSelection.stat}
        onValueChange={currentStat => changeHandler(currentStat)}>
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
      <Button
        title="Scan opponent QR code"
        onPress={() => commenceScanningHandler(true)}
      />
      <Button
        title="Generate QR code for opponent to scan"
        onPress={() => commenceScanningHandler(false)}
      />
    </View>
  );
};
