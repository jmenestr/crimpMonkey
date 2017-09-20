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
import { connect, Dispatch } from 'react-redux';
import { Repeater, Grip, WorkoutState, getSelectedWorkout, getEditableWorkout, RepeaterDetails, updateWorkoutDetailsAction, getEditableName, getEditableHangboardType } from '../models/workoutModel';

export interface OwnProps {
  navigation: any
}
export interface MappedProps {
  repeater: Repeater
  name: string;
  hangboardType: string;
}
export interface MappedDispatch {
  edit: (key: Partial<RepeaterDetails>, value: string | number) => void
}

export type Props = OwnProps & MappedProps & MappedDispatch
class HangboardRepeaerEdit extends React.PureComponent<Props, {}> {
  static navigationOptions = ({ navigation }: any) => ({
    headerStyle: {
      backgroundColor: '#274060',
    },
    headerBackTitleStyle: {
      color: 'white'
    },
    headerTintColor: 'white'
  })

  render() {
    console.log('name', this.props.name)
    const {
      navigation,
      repeater,
      edit,
      name,
      hangboardType
    } = this.props
    return (
      <View style={{backgroundColor: 'white', flex: 1}}>
        <EditWorkoutForm name={name} hangboardType={hangboardType} onChange={edit} />
        <ScrollView style={{flex: 3, paddingHorizontal: 5}}>
        {
          (repeater as Repeater).grips.map((grip, index) => (
            <TouchableOpacity key={index} onPress={() => navigation.navigate('EditRepeaterGrip')}>
              <GripDetail grip={grip} />
            </TouchableOpacity>
            ))
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
const mapStateToProps = (state: WorkoutState): MappedProps => ({
  repeater: getEditableWorkout(state),
  name: getEditableName(state),
  hangboardType: getEditableHangboardType(state),

})

const mapDispatchToProps = (dispatch: Dispatch<WorkoutState>): MappedDispatch => ({
  edit: (key: Partial<RepeaterDetails>, value: string | number) => dispatch(updateWorkoutDetailsAction({ key, value }))
})

export default connect(mapStateToProps, mapDispatchToProps)(HangboardRepeaerEdit)
