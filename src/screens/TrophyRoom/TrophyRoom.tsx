import {useFocusEffect} from '@react-navigation/native';
import React, {useState} from 'react';
import {Text, View, Image} from 'react-native';
import getStoredPlayerData from '../../functions/getStoredPlayerData';
import {storage} from '../../store/mmkvStorage';
import {PlayerData} from '../../types';

export const TrophyRoom = () => {
  let storedPlayerData: PlayerData;
  try {
    storedPlayerData = getStoredPlayerData(storage);
  } catch (error) {
    console.log('Error occurred when fetching playerData: ', error);
    return <Text>An error occurred</Text>;
  }

  useFocusEffect(() => {
    storedPlayerData = getStoredPlayerData(storage)
  })

  console.log(storedPlayerData);
  return (
    <View>
      {storedPlayerData.trophies.length === 0 ? (
        <Text>No trophies to display</Text>
      ) : (
        storedPlayerData.trophies.map(trophy => {
          return (
            <Image
              style={{
                width: 50,
                height: 50,
              }}
              source={{uri: trophy}}
            />
          );
        })
      )}
    </View>
  );
};
