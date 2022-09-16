import React from 'react';
import {Button, Image, Text, View} from 'react-native';
import {AvatarStats} from '../types';

interface CharacterCreationViewProps {
  imageUri: string;
  // TODO:
  // If we don't provide an initial value to avatarStats in CharacterCreation.tsx, then we would need to make stats optional here:
  // stats?: AvatarStats;
  stats: AvatarStats;
  // TODO:
  // We can use the () => void type here to signify that we have functions which don't return anything.
  randomiseImageHandler: () => {};
  randomiseStatsHandler: () => {};
  finishCharacterHandler: () => {};
}

export const CharacterCreationView = ({
  imageUri,
  stats,
  randomiseImageHandler,
  randomiseStatsHandler,
  finishCharacterHandler,
}: CharacterCreationViewProps) => {
  //TODO:
  //If we make stats an optional prop further up, then we would need to catch any situation where stats was undefined e.g.:
  // if (!stats) {
  //   return <Text>Loading</Text>;
  // }
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
      <Button title="Roll Stats" onPress={randomiseStatsHandler} />
      <Button title="finish" onPress={finishCharacterHandler} />
    </View>
  );
};
