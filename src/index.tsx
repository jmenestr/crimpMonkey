import * as React from "react"
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Button,
} from 'react-native'
import {
  Container,
} from 'native-base'
import { StackNavigator } from 'react-navigation';
import HangboardRepeaters from "./hangboardRepeaters/HangboardRepeaters";


class Workout extends React.PureComponent<void, void> {
  render() {
    return (
      <Container>
        <HangboardRepeaters />
      </Container>
    )
  }
}



export default Workout
