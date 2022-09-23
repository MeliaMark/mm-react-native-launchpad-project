import React from 'react';
import {Button, Image, Text, View, TextInput} from 'react-native';
import {AvatarStats} from '../../types';

interface CharacterCreationViewProps {
  imageUri: string;
  stats?: AvatarStats;
  name: string | undefined;
  changeNameHandler: (newName: string) => void;
  randomiseImageHandler: () => void;
  randomiseStatsHandler: () => void;
  onChangeEmail: (text: string) => void;
  onChangePassword: (text: string) => void;
  createAccountHandler: () => void;
}

export const CharacterCreationView = ({
  imageUri,
  stats,
  name,
  changeNameHandler,
  randomiseImageHandler,
  randomiseStatsHandler,
  onChangeEmail,
  onChangePassword,
  createAccountHandler,
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
      <TextInput
        value={name}
        onChangeText={changeNameHandler}
        maxLength={6}
        placeholder={'Enter name here 3-6 characters'}
      />
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
        <Button title="Roll Stats" onPress={randomiseStatsHandler} />
        <TextInput placeholder="email" onChangeText={onChangeEmail} />
        <TextInput
          placeholder="password"
          onChangeText={onChangePassword}
          secureTextEntry={true}
        />
        <Button title="Create account" onPress={createAccountHandler} />
      </View>
    </View>
  );
};
