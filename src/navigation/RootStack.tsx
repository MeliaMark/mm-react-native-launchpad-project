import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SignInScreen} from '../screens/SignIn';
import {BottomTabs} from './BottomTabs';
import { CharacterCreation } from '../screens/CharacterCreation/CharacterCreation';

export interface RootStackParamList {
  SignIn: undefined;
  Home: {userId: string};
}

const Stack = createNativeStackNavigator();

export const RootStack = () => {
  return (
    <Stack.Navigator initialRouteName="SignIn">
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="Create account" component={CharacterCreation} />
      <Stack.Screen
        name="Home"
        component={BottomTabs}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
