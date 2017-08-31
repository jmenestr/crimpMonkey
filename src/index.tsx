import * as React from 'react';
import { StackNavigator } from 'react-navigation';
import {
  View,
  Text,
} from 'react-native';
import HangboardRepeater from "./hangboardRepeaters/HangboardRepeaters";
import HangboardRepeaerEdit from "./hangboardRepeaters/EditRepeater";

const HangboardApp = StackNavigator(
  {
    Home: { screen: HangboardRepeater },
    Edit: { screen: HangboardRepeaerEdit }
  },
);

export default HangboardApp;
