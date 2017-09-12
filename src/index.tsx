import * as React from 'react';
import { StackNavigator } from 'react-navigation';
import { Provider, connect } from 'react-redux'

import {
  View,
  Text,
} from 'react-native';
import HangboardRepeater from "./hangboardRepeaters/HangboardRepeaters";
import HangboardRepeaerEdit from "./hangboardRepeaters/EditRepeater";
import store from './store';
import EditRepeaterGrip from './hangboardRepeaters/EditRepeaterGrip';

const HangboardApp = StackNavigator(
  {
    Home: { screen: HangboardRepeater },
    EditRepeater: { screen: HangboardRepeaerEdit },
    EditRepeaterGrip:  { screen: EditRepeaterGrip }
  },
);

const ConnectedApp = () => (
  <Provider store={store}>
    <HangboardApp />
  </Provider>
)
export default ConnectedApp;
