import React from 'react';
import {Button, Image, Text, View} from 'react-native';
import {AvatarStats} from '../types';

interface CharacterCreationViewProps {
  imageUri: string;
  stats?: AvatarStats;
  randomiseImageHandler: () => void;
  randomiseStatsHandler: () => void;
  finishCharacterHandler: () => void;
}

export const CharacterCreationView = ({
  imageUri,
  stats,
  randomiseImageHandler,
  randomiseStatsHandler,
  finishCharacterHandler,
}: CharacterCreationViewProps) => {
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
        {stats ? (
          Object.entries(stats).map(([statName, statValue]) => {
            return (
              <Text key={statName}>
                {statName}: {statValue}
              </Text>
            );
          })
        ) : (
          <Text>No stats available</Text>
        )}
      </View>
      <Button title="Roll Stats" onPress={randomiseStatsHandler} />
      <Button title="finish" onPress={finishCharacterHandler} />
    </View>
  );
};
