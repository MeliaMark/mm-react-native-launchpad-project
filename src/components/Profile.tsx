import {CharacterCreationView} from './CharacterCreationView';
import React, {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import {AvatarStats, PlayerData, SetState} from '../types';
import {storage} from '../store/mmkvStorage';
import {ProfileView} from './ProfileView';
import {Text} from 'react-native';

export const Profile = ({navigation}) => {
  const [playerData, setPlayerData]: [PlayerData, SetState<PlayerData>] =
    useState(JSON.parse(storage.getString('playerData') as string));
  // const storagePlayerData = storage.getString('playerData');
  // const [playerData, setPlayerData] = useState<PlayerData>();

  /*TODO:
  Intertwining local state and storage in this ^ way can get confusing and messy.
  A better practice might be to assign playerData from storage to a variable (without saving to local state):

  Then initialise some local state:

  Then inside getRandomAvatar, you can build newPlayerData with the storagePlayerData and save to local state:
  const newPlayerData = {...storagePlayerData, avatarUri: imageUri};
  setPlayerData(newPlayerData);
  */

  //When the below was used, changing the avatar would re-render the stats as 0
  //   useEffect(() => {
  //     const storedPlayerData = storage.getString('playerData');
  //     if (storedPlayerData) {
  //       setPlayerData(JSON.parse(storedPlayerData));
  //     }
  //   }, []);

  //candidate for extracting out, just need to modify function so it is compatible with character creation version
  const getRandomAvatar = useCallback(async () => {
    const url = `https://sprites-as-a-service-tblytwilzq-ue.a.run.app/api/v1/sprite`;
    const response = await axios.get(url).catch(error => {
      console.log('something went wrong');
      return {data: ''};
    });
    const imageUri = `data:image/png;base64,${response.data}`;
    const newPlayerData = {...playerData, avatarUri: imageUri};
    // const newPlayerData = {...storagePlayerData, avatarUri: imageUri};

    setPlayerData(newPlayerData);
  }, []);

  // TODO:
  // Don't need async keyword as no asynchronous functionality.
  const saveChanges = async () => {
    storage.set('playerData', JSON.stringify(playerData));
  };

  // if (!playerData) {
  //   return <Text>Loading</Text>;
  // }

  return (
    <ProfileView
      imageUri={playerData.avatarUri}
      stats={playerData.avatarStats}
      randomiseImageHandler={() => getRandomAvatar()}
      saveChangesHandler={() => saveChanges()}
    />
  );
};
