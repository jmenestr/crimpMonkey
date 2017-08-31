import * as React from 'react';
import { Repeater } from '../store';
import { Row, Col } from 'native-base';
import { View, TextInput, Text } from 'react-native';
import NumericInput from '../commonComponents/NumericInput';

export interface EditFormProps {
  repeater: Repeater
}
export default class EditWorkoutForm extends React.PureComponent<EditFormProps, {}> {
  render() {
    return (
      <View style={{height: 165, backgroundColor: '#BDD5EA'}}>
        <Row>
          <Col>
            <TextInput
              style={{height: 30, borderColor: '#1B2845', borderBottomWidth: 1, paddingHorizontal: 10}}
              placeholder='Workout Name'
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <TextInput
              style={{height: 30, borderColor: '#1B2845', borderBottomWidth: 1, paddingHorizontal: 10}}
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
