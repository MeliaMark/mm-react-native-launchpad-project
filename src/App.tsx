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
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {SignInScreen} from './screens/SignIn';

const App = () => {
  const [initialising, setInitialising] = useState<boolean>(true);
  const [user, setUser] = useState();

  const onAuthStateChanged = user => {
    setUser(user);
    if (initialising) setInitialising(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initialising) return null;

  if (!user) {
    return (
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <BottomTabs playerUid={(user as FirebaseAuthTypes.User).uid} />
    </NavigationContainer>
  );
};

export default App;
