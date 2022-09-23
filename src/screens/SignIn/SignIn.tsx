import React, {useState} from 'react';
import {
  Button,
  Text,
  View,
  Linking,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import {SignInView} from './SignInView';

export const SignIn = ({navigation}) => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const onChangeEmail = (text: string) => {
    setEmail(text);
  };
  const onChangePassword = (text: string) => {
    setPassword(text);
  };

  const signInHandler = () => {
    console.log('signing in')
    if (!email || !password) {
      console.log('No email or password');
      return;
    }
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created and signed in');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }
        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
        console.error(error);
      });
  };

  const goToCreateAccount = () => {
    navigation.navigate('Create account')
  }

  return (
    <SignInView
      onChangeEmail={onChangeEmail}
      onChangePassword={onChangePassword}
      signInHandler={signInHandler}
      goToCreateAccount={goToCreateAccount}
    />
  );
};
