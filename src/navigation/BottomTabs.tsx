import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Profile} from '../screens/Profile/Profile';
import {Fight} from '../screens/Fight/Fight';
import {TrophyRoom} from '../screens/TrophyRoom/TrophyRoom';

const Tab = createBottomTabNavigator();

interface BottomTabsProps {
  playerUid: string;
}

export const BottomTabs = ({playerUid}: BottomTabsProps) => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Fight" component={Fight} />
      <Tab.Screen name="TrophyRoom" component={TrophyRoom} />
    </Tab.Navigator>
  );
};
