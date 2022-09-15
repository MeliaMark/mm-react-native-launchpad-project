import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SignInScreen} from '../screens/SignIn';
import {CreateAccountScreen} from '../screens/CreateAccount';
import { BottomTabs } from './BottomTabs';

export interface RootStackParamList {
  SignIn: undefined;
  Home: {userId: string};
}

const Stack = createNativeStackNavigator();

export const RootStack = () => {
  return (
    <Stack.Navigator initialRouteName='SignIn'>
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="Create account" component={CreateAccountScreen} />
      <Stack.Screen name="Home" component={BottomTabs} />
    </Stack.Navigator>
  );
};
