import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RootStack} from './RootStack';
import {FightScreen} from '../screens/Fight';
import { View } from 'react-native';
import { ProfileScreen } from '../screens/Home';

const Tab = createBottomTabNavigator();

export const BottomTabs = () => {
  //Todos:
  //Profile with Gallery
  //Fight
  //Settings
  return (
      <Tab.Navigator>
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="Fight" component={FightScreen} />
      </Tab.Navigator>
  );
};
