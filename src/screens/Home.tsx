import React from 'react';
import {Button, View} from 'react-native';
import {Profile} from '../components/Profile';

export const ProfileScreen = ({navigation}) => {
  return (
    <View>
      {
        // TODO:
        // We don't want to pass navigation down in props.
        // If there's a component that isn't a screen and requires the navigation object then we can use the useNavigation method that comes as part of React Navigation:
        // https://reactnavigation.org/docs/use-navigation/
      }
      <Profile navigation={navigation} />
      <Button
        title="Log Out"
        onPress={() => {
          navigation.navigate('SignIn');
        }}
      />
    </View>
  );
};
