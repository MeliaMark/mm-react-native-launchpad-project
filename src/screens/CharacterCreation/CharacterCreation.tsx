import {CharacterCreationView} from './CharacterCreationView';
import React, {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import {AvatarStats, PlayerData, SavedPlayer} from '../../types';
import {storage} from '../../store/mmkvStorage';
import analytics from '@react-native-firebase/analytics';
import {Text} from 'react-native';
import auth from '@react-native-firebase/auth';

export const CharacterCreation = () => {
  const [avatarUri, setAvatarUri] = useState<string>('data:image/png;base64,');
  const [avatarStats, setAvatarStats] = useState<AvatarStats>();
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const onChangeEmail = (text: string) => {
    setEmail(text);
  };
  const onChangePassword = (text: string) => {
    setPassword(text);
  };

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
    setAvatarStats(newStats); // doesn't seem to update state
    console.log('setAvatarStats called');
  };

  const changeName = (newName: string) => {
    console.log('newName: ', newName);
    console.log('name: ', name);
    setName(newName); //doesn't seem to actually update state either
  };

  const createAccountHandler = () => {
    if (!email || !password) {
      console.log('No email or password');
      return;
    }
    if (!name || name.length < 3) {
      console.log('Name not long enough, use 3 to 6 characters');
      return;
    }
    if (avatarStats) {
      const playerData: PlayerData = {
        avatarStats,
        avatarUri,
        name,
        wins: 0,
        losses: 0,
        trophies: [],
      };
      console.log('Saving player data');

      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          const playerDataString = `${JSON.stringify(playerData)}`;
          storage.set(`playerData.${auth().currentUser?.uid}`, playerDataString);
          console.log('User account created and signed in');
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
          }
          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }
          console.error(error);
        });
    }
  };

  useEffect(() => {
    getRandomAvatar();
    getRandomStats();
  }, []);

  return (
    <CharacterCreationView
      imageUri={avatarUri}
      stats={avatarStats}
      name={name}
      changeNameHandler={changeName}
      randomiseImageHandler={getRandomAvatar}
      randomiseStatsHandler={getRandomStats}
      onChangeEmail={onChangeEmail}
      onChangePassword={onChangePassword}
      createAccountHandler={createAccountHandler}
    />
  );
};
