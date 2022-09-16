import React, {useEffect, useState} from 'react';
import {Button, Image, View} from 'react-native';
import axios from 'axios';
import {PlayerData, SetState} from '../types';
import {CharacterCreation} from '../components/CharacterCreation';

//TODO:
//Get avatar - https://ljvmiranda921.github.io/sprites-as-a-service/ DONE
//assign points, 100 points assigned to 4 categories a,b,c,d: fighters choose what to fight with
// a>b>c>d>a, if a is up against b then value of b is reduced, a vs c and a vs d are neutral
//Choose name? sanitize input or randomize

// TODO:
//Seems like an unnecessary component
export const CreateAccountScreen = ({navigation}) => {
  return (
    <View>
      {/*
        TODO:
        See comment in Home.tsx about passing navigation down to children.
      */}
      <CharacterCreation navigation={navigation} />
    </View>
  );
};
