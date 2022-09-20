import React from 'react';
import {Button, Image, Text, View} from 'react-native';
import {AvatarStats} from '../types';

interface ProfileViewProps {
  imageUri: string;
  stats: AvatarStats;
  randomiseImageHandler: () => void;
  saveChangesHandler: () => void;
}

export const ProfileView = ({
  imageUri,
  stats,
  randomiseImageHandler,
  saveChangesHandler,
}: ProfileViewProps) => {
  return (
    <View>
      <Image
        style={{
          width: 50,
          height: 50,
        }}
        source={{uri: imageUri}}
      />
      <Button title="Change Avatar" onPress={randomiseImageHandler} />
      <Text key="name">Default Name</Text>
      <View key="stats">
        {Object.entries(stats).map(([statName, statValue]) => {
          return (
            <Text key={statName}>
              {statName}: {statValue}
            </Text>
          );
        })}
      </View>
      <Button title="Save Changes" onPress={saveChangesHandler} />
    </View>
  );
};
