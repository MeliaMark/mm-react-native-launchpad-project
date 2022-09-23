import React from 'react';
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

interface SignInViewProps {
  onChangeEmail: (text: string) => void;
  onChangePassword: (text: string) => void;
  signInHandler: () => void;
  goToCreateAccount: () => void;
}

export const SignInView = ({
  onChangeEmail,
  onChangePassword,
  signInHandler,
  goToCreateAccount,
}: SignInViewProps) => {
  return (
    <View>
      <TextInput placeholder="email" onChangeText={onChangeEmail} />
      <TextInput
        placeholder="password"
        onChangeText={onChangePassword}
        secureTextEntry={true}
      />
      <Button title="Sign in with email and password" onPress={signInHandler} />
      {/* <Text>Don't have an account? Create one now</Text> */}
      <Button
        title="Don't have an account? Create one now"
        onPress={goToCreateAccount}
      />
    </View>
  );
};
