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
import { Repeater, Grip, WorkoutState, getSelectedWorkout, RepeaterDetails, updateWorkoutDetailsAction, getEditableName, getEditableHangboardType, getEditableGrips, setSelectedGripAction } from '../models/workoutModel';
import SaveRepeaterButton from './SaveRepeater';

export interface OwnProps {
  navigation: any
}
export interface MappedProps {
  grips: Array<Grip>
  name: string;
  hangboardType: string;
}

interface MappedDispatch {
  setSelectedGrip: (index: number | undefined) => void
}

export type Props = OwnProps & MappedProps & MappedDispatch
class HangboardRepeaerEdit extends React.PureComponent<Props, {}> {
  static navigationOptions = ({ navigation }: any) => ({
    headerStyle: {
      backgroundColor: '#274060',
    },
    headerRight: <SaveRepeaterButton navigation={navigation} />,
    headerBackTitleStyle: {
      color: 'white'
    },
    headerTintColor: 'white'
  })


  render() {
    const {
      navigation,
      grips,
    } = this.props
    return (
      <View style={{backgroundColor: 'white', flex: 1}}>
        <EditWorkoutForm />
        <ScrollView style={{flex: 3, paddingHorizontal: 5}}>
        {
          grips.map((grip, index) => (
            <TouchableOpacity key={index} onPress={() => {
              navigation.navigate('EditRepeaterGrip')
              let i = index;
              this.props.setSelectedGrip(i)
            }}>
              <GripDetail grip={grip} />
            </TouchableOpacity>
            ))
        }
        </ScrollView>
        <View style={{flex: 0}}>
          <TouchableOpacity activeOpacity={0.5}  onPress={() => {
            navigation.navigate('EditRepeaterGrip')
          }}>
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
  grips: getEditableGrips(state),
  name: getEditableName(state),
  hangboardType: getEditableHangboardType(state),

})

const mapDispatchToProps = (dispatch: Dispatch<WorkoutState>): MappedDispatch => ({
  setSelectedGrip: (index: number | undefined) => dispatch(setSelectedGripAction({ gripIndex: index}))
})

export default connect(mapStateToProps, mapDispatchToProps)(HangboardRepeaerEdit)
