import React from 'react';
import {Button, Text, View, Linking, TouchableOpacity} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/RootStack';

export const SignInScreen = ({navigation}) => {
  const onSuccess = (e: any) => {
    console.log('success')
    navigation.navigate(e.data).catch(err =>
      console.error('An error occured', err),
    );
  };
  return (
    <View>
      <Button
        title="sign in"
        onPress={() => {
          console.log('Navigating to Home');
          navigation.navigate('Home');
        }}
      />
      <Button
        title="Create Account"
        onPress={() => {
          console.log('Navigating to character creation');
          navigation.navigate('Create account');
        }}
      />
    </View>
  );
};
