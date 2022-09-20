import React from 'react';
import {Image, Text, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {AvatarStats, BattleState, PlayerData, StatSelection} from '../types';
import {BattleViewChoicePhase} from './BattleViewChoicePhase';
import {BattleViewEndPhase} from './BattleViewEndPhase';

interface BattleViewProps {
  battleState: BattleState;
  playerData: PlayerData;
  playerChoiceChangeHandler: (stat: StatSelection) => void;
  endChoicePhaseHandler: () => void;
}

//Could add a short screen to symbolise a battle, animation bumping the avatars together

export const BattleView = ({
  battleState,
  playerData,
  playerChoiceChangeHandler,
  endChoicePhaseHandler,
}: BattleViewProps) => {
  return (
    <View>
      <View>
        <Image
          style={{
            width: 50,
            height: 50,
          }}
          source={{uri: playerData.avatarUri}}
        />
      </View>
      <View>
        {battleState.choicePhase.phaseComplete ? (
          <BattleViewEndPhase />
        ) : (
          <BattleViewChoicePhase
            playerSelection={battleState.choicePhase.playerSelection}
            playerData={playerData}
            playerChoiceChangeHandler={playerChoiceChangeHandler}
            endChoicePhaseHandler={endChoicePhaseHandler}
          />
        )}
      </View>
    </View>
  );
};
