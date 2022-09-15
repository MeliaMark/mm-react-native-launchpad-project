import React from 'react';
import {Button, View} from 'react-native';
import { Profile } from '../components/Profile';

export const ProfileScreen = ({navigation}) => {
  return (
    <View>
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
