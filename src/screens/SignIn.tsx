import React from 'react';
import {Button, Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/RootStack';

export const SignInScreen = ({navigation}) => {
  return (
    <View>
      <Button
        title="sign in"
        onPress={() => {
          navigation.navigate('Home');
        }}
      />
      <Button
        title="Create Account"
        onPress={() => {
          navigation.navigate('Create account');
        }}
      />
    </View>
  );
};
