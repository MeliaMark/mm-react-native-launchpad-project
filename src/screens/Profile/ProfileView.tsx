import React from 'react';
import {Button, Image, Text, View} from 'react-native';
import {AvatarStats, PlayerData} from '../../types';

interface ProfileViewProps {
  playerData: PlayerData;
  logOutHandler: () => void
}

export const ProfileView = ({
  playerData, logOutHandler
}: ProfileViewProps) => {
  return (
    <View>
      <Image
        style={{
          width: 50,
          height: 50,
        }}
        source={{uri: playerData.avatarUri}}
      />
      <Text key="name">{playerData.name}</Text>
      <View key="stats">
        {Object.entries(playerData.avatarStats).map(([statName, statValue]) => {
          return (
            <Text key={statName}>
              {statName}: {statValue}
            </Text>
          );
        })}
      </View>
      <Text key="wins and losses">
        Wins: {playerData.wins}; Losses {playerData.losses}
      </Text>
      <Button
        title="Log Out"
        onPress={logOutHandler}
      />
    </View>
  );
};
