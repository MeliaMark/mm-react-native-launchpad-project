import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Profile} from '../screens/Profile/Profile';
import { Fight } from '../screens/Fight/Fight';
import { TrophyRoom } from '../screens/TrophyRoom/TrophyRoom';

const Tab = createBottomTabNavigator();

export const BottomTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Fight" component={Fight} />
      <Tab.Screen name="TrophyRoom" component={TrophyRoom} />
    </Tab.Navigator>
  );
};
