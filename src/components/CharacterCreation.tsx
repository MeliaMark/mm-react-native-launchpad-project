import {CharacterCreationView} from './CharacterCreationView';
import React, {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import {PlayerData} from '../types';
import {storage} from '../store/mmkvStorage';

export const CharacterCreation = ({navigation}) => {
  const [avatarUri, setAvatarUri] = useState('data:image/png;base64,');
  const [avatarStats, setAvatarStats] = useState({
    stat1: 0,
    stat2: 0,
    stat3: 0,
    stat4: 0,
  });

  const getRandomAvatar = useCallback(async () => {
    // const randomString = Math.random().toString().split('.')[1];
    // const url = `https://sprites-as-a-service-tblytwilzq-ue.a.run.app/api/v1/sprite?q=${randomString}`;
    const url = `https://sprites-as-a-service-tblytwilzq-ue.a.run.app/api/v1/sprite`;
    const response = await axios.get(url)
    const imageUri = `data:image/png;base64,${response.data}`;
    setAvatarUri(imageUri);
  }, []);

  const getRandomStats = useCallback(async () => {
    const stat1 = Math.round(Math.random() * 100);
    const stat2 = Math.round(Math.random() * (100 - stat1));
    const stat3 = Math.round(Math.random() * (100 - stat1 - stat2));
    let stat4 = Math.round(Math.random() * (100 - stat1 - stat2 - stat3));
    stat4 += 100 - stat1 - stat2 - stat3 - stat4;
    const sum = stat1 + stat2 + stat3 + stat4;
    setAvatarStats({stat1, stat2, stat3, stat4});
  }, []);

  const createAccount = async () => {
    const playerData: PlayerData = {
      avatarStats,
      avatarUri,
      name: 'Default name',
    };
    storage.set('playerData', JSON.stringify(playerData));
    navigation.navigate('Home');
  };

  useEffect(() => {
    getRandomAvatar();
    getRandomStats();
  }, []);

  return (
    <CharacterCreationView
      imageUri={avatarUri}
      stats={avatarStats}
      randomiseImageHandler={() => getRandomAvatar()}
      randomiseStatsHandler={() => getRandomStats()}
      finishCharacterHandler={() => createAccount()}
    />
  );
};
