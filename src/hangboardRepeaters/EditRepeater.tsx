import * as React from 'react';


import {
  View,
  Text,
  TextInput,
  ScrollView,
} from 'react-native';
import {
  Row,
  Col,
} from 'native-base';

import { Jiro, Isao } from 'react-native-textinput-effects';

import NumericInput from "../commonComponents/NumericInput";
import EditWorkoutForm from './EditWorktoutForm';
import GripDetail from './GripDetail';
import { Repeater, getRepeater, RepeaterState, Grip } from './hangboardRepeaterModel';
import { connect } from 'react-redux';

export interface Props {
  repeater: Repeater
}
export type State = Props
const newGrip: Grip = {
  name: 'New Grip',
  sets: []
}
class HangboardRepeaerEdit extends React.PureComponent<Props, State> {
  static navigationOptions = ({ navigation }: any) => ({
    headerStyle: {
      backgroundColor: '#274060',
    },
    headerBackTitleStyle: {
      color: 'white'
    },
    headerTintColor: 'white'
  })
  constructor(props: Props) {
    super(props)
    this.state = {
      repeater: props.repeater
    }
  }
  render() {
    const {
      repeater
    } = this.state
  
    return (
      <View style={{backgroundColor: 'white', flex: 1}}>
        <EditWorkoutForm repeater={repeater} />
        <ScrollView style={{flex: 3, paddingHorizontal: 5}}>
        {
          (repeater as Repeater).grips.map((grip, index) => <GripDetail key={index} grip={grip} />)
        }
        </ScrollView>
        <View style={{height: 40, backgroundColor: '#FE5F55'}}>
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          
          <Text style={{color: 'white'}}> Add Grip </Text>
          </View>
        </View>
      </View>
    )
  }
}
const mapStateToProps = (state: RepeaterState) => ({
  repeater: getRepeater(state)
})
export default connect(mapStateToProps, () => ({}))(HangboardRepeaerEdit)
