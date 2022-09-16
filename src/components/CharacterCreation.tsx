import {CharacterCreationView} from './CharacterCreationView';
import React, {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import {AvatarStats, PlayerData} from '../types';
import {storage} from '../store/mmkvStorage';

export const CharacterCreation = ({navigation}) => {
  const [avatarUri, setAvatarUri] = useState('data:image/png;base64,');
  // TODO:
  // We can use generic types when we initialise state so that we don't have to define an object structure:
  // const [avatarStats, setAvatarStats] = useState<AvatarStats>();
  const [avatarStats, setAvatarStats] = useState({
    stat1: 0,
    stat2: 0,
    stat3: 0,
    stat4: 0,
  });

  // TODO:
  // useCallback not required here as not passing getRandomAvatar to child component
  const getRandomAvatar = useCallback(async () => {
    // const randomString = Math.random().toString().split('.')[1];
    // const url = `https://sprites-as-a-service-tblytwilzq-ue.a.run.app/api/v1/sprite?q=${randomString}`;
    const url = `https://sprites-as-a-service-tblytwilzq-ue.a.run.app/api/v1/sprite`;
    const response = await axios.get(url);
    const imageUri = `data:image/png;base64,${response.data}`;
    setAvatarUri(imageUri);
  }, []);

  // TODO:
  // useCallback not required here as not passing getRandomStats to child component.
  // There's no asynchronous behaviour in this function so we don't need the async keyword.
  const getRandomStats = useCallback(async () => {
    const stat1 = Math.round(Math.random() * 100);
    const stat2 = Math.round(Math.random() * (100 - stat1));
    const stat3 = Math.round(Math.random() * (100 - stat1 - stat2));
    let stat4 = Math.round(Math.random() * (100 - stat1 - stat2 - stat3));
    stat4 += 100 - stat1 - stat2 - stat3 - stat4;
    const sum = stat1 + stat2 + stat3 + stat4;
    setAvatarStats({stat1, stat2, stat3, stat4});
  }, []);

  // TODO:
  // This is being passed into a child component so we want to wrap it in a useCallback() which prevents unnecessary re-renders
  // There's no asynchronous behaviour in this function so we don't need the async keyword.
  const createAccount = async () => {
    //TODO:
    // As we haven't given an initial value to avatarStats, we may want to check whether avatarStats has any value before creating account.
    // If we had initialised avatarStats as all being 0, then we technically could create the account with stats that are all 0.
    // if (avatarStats) {
    const playerData: PlayerData = {
      avatarStats,
      avatarUri,
      name: 'Default name',
    };
    storage.set('playerData', JSON.stringify(playerData));
    navigation.navigate('Home');
    // }
  };

  useEffect(() => {
    getRandomAvatar();
    getRandomStats();
  }, []);

  return (
    <CharacterCreationView
      imageUri={avatarUri}
      stats={avatarStats}
      // TODO:
      // we can pass in a function without wrapping it in another anonymous arrow function
      randomiseImageHandler={() => getRandomAvatar()}
      randomiseStatsHandler={() => getRandomStats()}
      finishCharacterHandler={() => createAccount()}
    />
  );
};
