import React, {useState} from 'react';
import {BattleView} from './BattleView';



export const Battle = () => {
  const [battleState, setBattleState] = useState();

  const chooseStat = () => {

  }

  return <BattleView battleState={battleState}/>;
};
