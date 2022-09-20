import {CharacterCreationView} from '../components/CharacterCreationView';
import React, {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import {AvatarStats, PlayerData, SetState} from '../types';
import {storage} from '../store/mmkvStorage';
import {ProfileView} from '../components/ProfileView';
import {Button, Text, View} from 'react-native';

export const Profile = ({navigation}) => {
  const storedPlayerDataString = storage.getString('playerData');
  if (!storedPlayerDataString) {
    return <Text>Something went wrong, please try again</Text>;
  }
  const storedPlayerData = JSON.parse(storedPlayerDataString);

  const [playerData, setPlayerData] = useState<PlayerData>();

  //candidate for extracting out, just need to modify function so it is compatible with character creation version
  const getRandomAvatar = useCallback(async () => {
    console.log('Getting random avatar')
    const url = `https://sprites-as-a-service-tblytwilzq-ue.a.run.app/api/v1/sprite`;
    const response = await axios.get(url);
    const imageUri = `data:image/png;base64,${response.data}`;
    const newPlayerData = {...storedPlayerData, avatarUri: imageUri};
    setPlayerData(newPlayerData);
  }, []);

  const saveChanges = () => {
    console.log('Saving changes')
    const playerDataString = `${JSON.stringify(playerData)}`
    storage.set("playerData", playerDataString);
  };

  return (
    <View>
      <ProfileView
        imageUri={
          playerData ? playerData.avatarUri : storedPlayerData.avatarUri
        }
        stats={
          playerData ? playerData.avatarStats : storedPlayerData.avatarStats
        }
        randomiseImageHandler={getRandomAvatar}
        saveChangesHandler={saveChanges}
      />
      <Button
        title="Log Out"
        onPress={() => {
          navigation.navigate('SignIn');
        }}
      />
    </View>
  );
};
