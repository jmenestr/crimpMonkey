import * as React from 'react';
import HangboardRepeaterHeader from './HangboardRepeaterHeader';
import {
  View,
  Text,
  FlatList,
  ScrollView,
} from 'react-native';
import { Container, Content, Icon, Button, , Row, Col } from 'native-base';
import HangboardRepeaterDetails from "./HangboardRepeaterDetails";
import Grips from './Grips';
import { lightBlue, lightGrey } from '../styles';
import GripDetail from "./GripDetail";
import styled from 'styled-components/native';

export interface GripSet {
  setNumber: number;
  goalWeight: number;
  actualWeight?: number;
  reps: number;
  complete: boolean;
}
export interface Grip {
  name: string;
  sets: Array<GripSet>;
}

export interface Repeater {
  name: string;
  date: Date;
  restDuration: number;
  onDuration: number;
  offDuration: number;
  grips: Array<Grip>
}

interface State {
  repeater: Repeater
}

const grips: Array<Grip> = [
  {
    name: 'Jug',
    sets: [
      {
        setNumber: 1,
        goalWeight: 30,
        reps: 7,
        complete: false
      },
      {
        setNumber: 2,
        goalWeight: 40,
        reps: 7,
        complete: false
      }
    ]
  },
  {
    name: '2 Finger Pad',
    sets: [
      {
        setNumber: 1,
        goalWeight: 30,
        reps: 7,
        complete: false
      },
      {
        setNumber: 2,
        goalWeight: 40,
        reps: 7,
        complete: false
      },
      {
        setNumber: 3,
        goalWeight: 40,
        reps: 7,
        complete: false
      }
    ]
  }
]
const repeater: Repeater = {
  name: 'Example Repeater',
  date: new Date(),
  restDuration: 180,
  onDuration: 7,
  offDuration: 3,
  grips,
}


const BorderRight = styled(Col)`
borderColor: #3D4C67;
borderRightWidth: 1;
borderTopWidth: 1;
`
export default class HangboardRepeater extends React.PureComponent<{}, State> {

  static navigationOptions = ({navigation}: any) => ({
    headerTitle: <Text style={{color: 'white'}}>Repeaters</Text>,
    headerRight: <Button title='Edit' onPress={() => navigation.navigate('Edit')} />,
    headerBackTitle: 'back',
    headerStyle: {
      backgroundColor: '#3D4C67',
    },

    headerTintColor: 'white'
  })

  state: State = {
    repeater
  }

  render() {
    const {
      repeater
    } = this.state;
    return (
      <View style={{flex: 1, backgroundColor: '#2a3447'}}>
        <View style={{height: 60, backgroundColor: '#506487'}}>
          <Row style={{height: 30, justifyContent: 'center'}}><Text style={{color: 'white'}}> { repeater.name }</Text></Row>
          <Row style={{height: 30}}>
            <BorderRight>
              <Text style={{color: 'white'}}> { repeater.onDuration }</Text>
            </BorderRight>
            <BorderRight><Text style={{color: 'white'}}> { repeater.offDuration }</Text></BorderRight>
            <BorderRight><Text style={{color: 'white'}}> { repeater.restDuration }</Text></BorderRight>
          </Row>
        </View>
        <ScrollView style={{flex: 1}}>
          {
            repeater.grips.map((grip, index) => <GripDetail key={index} grip={grip} />)
          }
          </ScrollView>
      </View>
    )
  }
}
