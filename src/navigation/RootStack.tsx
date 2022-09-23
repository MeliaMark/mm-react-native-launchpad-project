import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {BottomTabs} from './BottomTabs';
import { CharacterCreation } from '../screens/CharacterCreation/CharacterCreation';
import { SignIn } from '../screens/SignIn/SignIn';

export interface RootStackParamList {
  SignIn: undefined;
  Home: {userId: string};
}

const Stack = createNativeStackNavigator();

export const RootStack = () => {
  return (
    <Stack.Navigator initialRouteName="SignIn">
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="Create account" component={CharacterCreation}/>
    </Stack.Navigator>
  );
};
