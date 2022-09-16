/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {View, Text, Button, FlatList} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {RootStack} from './navigation/RootStack';
import {BottomTabs} from './navigation/BottomTabs';

// TODO:
// General comments:
// Prettier is your friend :)
// Tidy up files (i.e. remove unnecessary imports/variables) as you go instead of leaving the tidy up until a later date

const App = () => {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
};

export default App;
