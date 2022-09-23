import {CharacterCreationView} from '../CharacterCreation/CharacterCreationView';
import React, {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import {AvatarStats, PlayerData} from '../../types';
import {storage} from '../../store/mmkvStorage';
import {ProfileView} from './ProfileView';
import {Button, Text, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import getStoredPlayerData from '../../functions/getStoredPlayerData';
import {useFocusEffect} from '@react-navigation/native';

export const Profile = () => {
  let storedPlayerData: PlayerData;
  try {
    storedPlayerData = getStoredPlayerData(storage);
  } catch (error) {
    console.log('Error occurred when fetching playerData: ', error);
    return <Text>An error occurred</Text>;
  }

  const logOutHandler = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };

  useFocusEffect(
    useCallback(() => {
      storedPlayerData = getStoredPlayerData(storage);
    }, []),
  );

  return (
    <View>
      <ProfileView
        playerData={storedPlayerData}
        logOutHandler={logOutHandler}
      />
    </View>
  );
};
