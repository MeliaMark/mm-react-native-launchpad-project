import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Battle} from '../screens/Battle';
import {Profile} from '../screens/Profile';
import { Fight } from '../components/Fight/Fight';

const Tab = createBottomTabNavigator();

export const BottomTabs = () => {
  //Todos:
  //Profile with Gallery
  //Fight
  //Settings
  return (
    <Tab.Navigator>
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Fight" component={Fight} />
    </Tab.Navigator>
  );
};
