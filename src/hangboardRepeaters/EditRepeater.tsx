import * as React from 'react';


import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Button,
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
  repeater: Repeater,
  navigation: any
}
export interface State {
  repeater: Repeater
}
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
    
    const {
      navigation
    } = this.props
    return (
      <View style={{backgroundColor: 'white', flex: 1}}>
        <EditWorkoutForm repeater={repeater} />
        <ScrollView style={{flex: 3, paddingHorizontal: 5}}>
        {
          (repeater as Repeater).grips.map((grip, index) => <GripDetail key={index} grip={grip} />)
        }
        </ScrollView>
        <View style={{flex: 0}}>
          <TouchableOpacity activeOpacity={0.5}  onPress={() => navigation.navigate('EditRepeaterGrip')}>
          <View style={{ height: 40, alignContent: 'center', justifyContent: 'center', backgroundColor: '#FE5F55', alignItems: 'center'}}>
            <Text style={{color: 'white'}}> Add Grip </Text>
          </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
const mapStateToProps = (state: RepeaterState) => ({
  repeater: getRepeater(state)
})
export default connect(mapStateToProps, () => ({}))(HangboardRepeaerEdit)
