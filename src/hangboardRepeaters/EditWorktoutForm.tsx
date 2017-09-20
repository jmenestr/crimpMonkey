import * as React from 'react';
import { Row, Col } from 'native-base';
import { View, TextInput, Text } from 'react-native';
import NumericInput from '../commonComponents/NumericInput';
import { RepeaterDetails, Repeater, WorkoutState, getEditableWorkout, getEditableName, getEditableHangboardType, updateWorkoutDetailsAction } from '../models/workoutModel';
import { MappedProps, MappedDispatch } from '../workouts/Workouts';
import { Dispatch, connect } from 'react-redux';

export interface MappedProps {
  name: string
  hangboardType: string
}

export interface MappedDispatch {
  edit: (key: Partial<RepeaterDetails>, value: string | number) => void  
}
export type Props = MappedDispatch & MappedProps
class EditWorkoutFormComponent extends React.PureComponent<Props, {}> {

   
  onNameChange = (event: any) => {
    const name = event.nativeEvent.text;
    this.props.edit('name', name);
  }

  onHangboardNameChange = (event: any) => {
    const name = event.nativeEvent.text;
    this.props.edit('hangboardType', name);
  }
  render() {
    console.log('form rendering')
    const {
      name,
      hangboardType,
    } = this.props
   
    return (
      <View style={{height: 165, backgroundColor: '#BDD5EA'}}>
        <Row>
          <Col>
            <TextInput
              onChange={this.onNameChange}
              style={{height: 30, borderColor: '#1B2845', borderBottomWidth: 1, paddingHorizontal: 10}}
              value={name}
              placeholder='Workout Name'
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <TextInput
              onChange={this.onHangboardNameChange}
              style={{height: 30, borderColor: '#1B2845', borderBottomWidth: 1, paddingHorizontal: 10}}
              value={hangboardType}
              placeholder='Hangboard Type'
            />
          </Col>
        </Row>
        <Row style={{ justifyContent: 'space-between'}}>
          <Col style={{alignItems: 'center', flex: 1}}>
            <Text style={{fontSize: 12}}> Rest Between Reps </Text>
            <NumericInput label='sec' />
          </Col>
          <Col style={{alignItems: 'center', flex: 1}}>
          <Text style={{fontSize: 12}}> Rep Duration </Text>
          <NumericInput label='sec' />
          </Col>
          <Col style={{alignItems: 'center', flex: 1}}>
          <Text style={{fontSize: 12}}> Test Between Sets </Text>
          <NumericInput label='sec' />
          </Col>
        </Row>
      </View>
    )
  }
}

const mapStateToProps = (state: WorkoutState): MappedProps => {
  console.log('mapping props')
  return {
    name: getEditableName(state),
    hangboardType: getEditableHangboardType(state),
  };
}

const mapDispatchToProps = (dispatch: Dispatch<WorkoutState>): MappedDispatch => ({
  edit: (key: Partial<RepeaterDetails>, value: string | number) => dispatch(updateWorkoutDetailsAction({ key, value }))
})

const WorkoutForm = connect(mapStateToProps, mapDispatchToProps)(EditWorkoutFormComponent);
export default WorkoutForm;
