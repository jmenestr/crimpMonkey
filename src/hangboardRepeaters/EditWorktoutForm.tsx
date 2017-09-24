import * as React from 'react';
import { Row, Col } from 'native-base';
import { View, TextInput, Text } from 'react-native';
import NumericInput from '../commonComponents/NumericInput';
import { RepeaterDetails, Repeater, WorkoutState, getEditableDetails, RepeaterDetailKeys, updateWorkoutDetailsAction } from '../models/workoutModel';
import { Dispatch, connect } from 'react-redux';

export interface MappedProps {
  details: RepeaterDetails
}

export interface MappedDispatch {
  edit: (key: Partial<RepeaterDetailKeys>, value: string | number) => void  
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

  onOffDurationChange = (event: any) => {
    const value = parseInt(event.nativeEvent.text);
    this.props.edit('offDuration', value);
  }

  onOnDurationChange = (event: any) => {
    const value = parseInt(event.nativeEvent.text);
    this.props.edit('onDuration', value);
  }

  onRestDurationChange = (event: any) => {
    const value = parseInt(event.nativeEvent.text);
    this.props.edit('restDuration', value);
  }

  convertNumberToString = (value: any) => isNaN(value) ? '' : value.toString()
  render() {
    const {
      name,
      hangboardType,
      onDuration,
      offDuration,
      restDuration,
    } = this.props.details
    
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
            <Text style={{fontSize: 12}}> Hang Duration </Text>
            <NumericInput value={this.convertNumberToString(onDuration)} onChange={this.onOnDurationChange} label='sec' />
          </Col>
          <Col style={{alignItems: 'center', flex: 1}}>
            <Text style={{fontSize: 12}}> Rest Between Reps </Text>
            <NumericInput value={this.convertNumberToString(offDuration)} onChange={this.onOffDurationChange} label='sec' />
          </Col>
            <Col style={{alignItems: 'center', flex: 1}}>
            <Text style={{fontSize: 12}}> Rest Between Sets </Text>
          <NumericInput value={this.convertNumberToString(restDuration)} onChange={this.onRestDurationChange} label='sec' />
          </Col>
        </Row>
      </View>
    )
  }
}

const mapStateToProps = (state: WorkoutState): MappedProps => {
  return {
    details: getEditableDetails(state),
  };
}

const mapDispatchToProps = (dispatch: Dispatch<WorkoutState>): MappedDispatch => ({
  edit: (key: Partial<RepeaterDetailKeys>, value: string | number) => dispatch(updateWorkoutDetailsAction({ key, value }))
})

const WorkoutForm = connect(mapStateToProps, mapDispatchToProps)(EditWorkoutFormComponent);
export default WorkoutForm;
