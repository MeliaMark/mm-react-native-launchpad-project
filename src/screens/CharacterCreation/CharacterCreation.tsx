import {CharacterCreationView} from './CharacterCreationView';
import React, {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import {AvatarStats, PlayerData} from '../../types';
import {storage} from '../../store/mmkvStorage';
import analytics from '@react-native-firebase/analytics';
import { Text } from 'react-native';

export const CharacterCreation = ({navigation}) => {
  const [avatarUri, setAvatarUri] = useState<string>('data:image/png;base64,');
  const [avatarStats, setAvatarStats] = useState<AvatarStats>();

  const getRandomAvatar = async () => {
    console.log('Getting random avatar');
    try {
      const url = `https://sprites-as-a-service-tblytwilzq-ue.a.run.app/api/v1/sprite`;
      const response = await axios.get(url);
      const imageUri = `data:image/png;base64,${response.data}`;
      console.log('avatar uri', imageUri);
      setAvatarUri(imageUri);
    } catch (error) {
      console.log(error);
      return <Text>Something went wrong</Text>;
    }
  };

  // this seems to give big stat1, could randomise order to shift this weighting
  const getRandomStats = () => {
    console.log('Randomising stats');
    const stat1 = Math.round(Math.random() * 100);
    const stat2 = Math.round(Math.random() * (100 - stat1));
    const stat3 = Math.round(Math.random() * (100 - stat1 - stat2));
    let stat4 = Math.round(Math.random() * (100 - stat1 - stat2 - stat3));
    stat4 += 100 - stat1 - stat2 - stat3 - stat4;
    const newStats: AvatarStats = {stat1, stat2, stat3, stat4};
    console.log('New Stats: ', newStats);
    setAvatarStats(newStats);
    console.log('setAvatarStats called')
  };

  const createAccount = useCallback(() => {
    console.log('Avatar stats:', avatarStats);
    if (avatarStats) {
      const playerData: PlayerData = {
        avatarStats,
        avatarUri,
        name: 'Default name',
        wins: 0,
        losses: 0,
      };
      console.log('Saving player data');
      const playerDataString = `${JSON.stringify(playerData)}`;
      storage.set('playerData', playerDataString);

      // await analytics().logEvent('account-created', {
      //   id: '1',
      //   item: 'stuff',
      // });
      console.log('Navigate to Home');
      navigation.navigate('Home');
    }
  }, []);

  useEffect(() => {
    getRandomAvatar();
    getRandomStats();
  }, []);

  return (
    <CharacterCreationView
      imageUri={avatarUri}
      stats={avatarStats}
      randomiseImageHandler={getRandomAvatar}
      randomiseStatsHandler={getRandomStats}
      finishCharacterHandler={createAccount}
    />
  );
};
