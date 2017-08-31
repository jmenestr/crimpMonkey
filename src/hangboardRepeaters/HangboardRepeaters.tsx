import * as React from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
} from 'react-native';
import { Row, Col, Icon, Button } from 'native-base';
import Grips from './Grips';
import GripDetail from "./GripDetail";
import styled from 'styled-components/native';
import RepeaterDetails from './RepeaterDetails';
import { Repeater, repeater } from '../store';


interface State {
  repeater: Repeater
}
const BodyText = styled.Text`
color: #E0E4E8;
fontSize: 16;
`
export default class HangboardRepeater extends React.PureComponent<any, State> {

  static navigationOptions = ({navigation}: any) => ({
    headerTitle: <Text style={{color: 'white', fontSize: 20}}>Repeaters</Text>,
    headerRight: <Button onPress={() => navigation.navigate('Edit', { repeater })} transparent>
            <Icon style={{color: 'white'}} name='md-create' />
          </Button>,
    headerBackTitleStyle: {
      color: 'white'
    },
    headerStyle: {
      backgroundColor: '#274060',
    },
  })

  state: State = {
    repeater
  }

  render() {
    const {
      repeater
    } = this.state;

    const {
      navigation,
    } = this.props;
    return (
      <View style={{flex: 1, backgroundColor: '#BDD5EA'}}>
        <RepeaterDetails repeater={repeater} />
        <ScrollView style={{flex: 1, paddingHorizontal: 5}}>
          {
            repeater.grips.map((grip, index) => <GripDetail key={index} grip={grip} />)
          }
          </ScrollView>
      </View>
    )
  }
}
