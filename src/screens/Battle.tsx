import React, {useEffect, useState} from 'react';
import {BattleView} from '../components/BattleView';
import {storage} from '../store/mmkvStorage';
import {
  BattleState,
  PlayerData,
  StatSelection,
  SetState,
  UseState,
} from '../types';

export const Battle = ({navigation}) => {
  //types being funky here, not sure why
  const [battleState, setBattleState] = useState<BattleState>({
    choicePhase: {
      playerSelection: StatSelection.Stat2,
      opponentSelection: StatSelection.Stat2,
      phaseComplete: false,
    },
    endPhase: {
      winner: undefined,
      phaseComplete: false,
    },
  });

  const [playerData, setPlayerData] = useState<PlayerData>(
    JSON.parse(storage.getString('playerData') as string),
  );

  const chooseStat = (stat: StatSelection) => {
    const newBattleState = {
      choicePhase: {...battleState.choicePhase, playerSelection: stat},
      endPhase: {...battleState.endPhase},
    };
    setBattleState(newBattleState);
  };

  const endChoicePhase = () => {
    const newBattleState = {
      choicePhase: {...battleState.choicePhase, phaseComplete: true},
      endPhase: {...battleState.endPhase},
    };
    setBattleState(newBattleState);
  };

  return (
    <BattleView
      battleState={battleState}
      playerData={playerData}
      playerChoiceChangeHandler={chooseStat}
      endChoicePhaseHandler={endChoicePhase}
    />
  );
};
