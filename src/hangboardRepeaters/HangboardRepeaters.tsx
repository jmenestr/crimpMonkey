import * as React from 'react';
import { connect } from 'react-redux'
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
import { Repeater, getRepeater, RepeaterState } from './hangboardRepeaterModel';



const BodyText = styled.Text`
color: #E0E4E8;
fontSize: 16;
`
interface Props {
  repeater: Repeater
}
class HangboardRepeaterComponent extends React.PureComponent<Props, {}> {

  static navigationOptions = ({navigation}: any) => ({
    headerTitle: <Text style={{color: 'white', fontSize: 20}}>Repeaters</Text>,
    headerRight: <Button onPress={() => navigation.navigate('EditRepeater')} transparent>
            <Icon style={{color: 'white'}} name='md-create' />
          </Button>,
    headerBackTitleStyle: {
      color: 'white'
    },
    headerStyle: {
      backgroundColor: '#274060',
    },
  })
  render() {
    const {
      repeater,
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

const mapStateToProps = (state: RepeaterState) => ({
  repeater: getRepeater(state)
})
const HangboardRepeaters = connect(mapStateToProps, () => ({}))(HangboardRepeaterComponent)
export default HangboardRepeaters

