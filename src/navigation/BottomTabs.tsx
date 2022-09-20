import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Battle} from '../screens/Battle';
import {Profile} from '../screens/Profile';

const Tab = createBottomTabNavigator();

export const BottomTabs = () => {
  //Todos:
  //Profile with Gallery
  //Fight
  //Settings
  return (
    <Tab.Navigator>
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Fight" component={Battle} />
    </Tab.Navigator>
  );
};
