import * as React from 'react';
import { Grip } from './HangboardRepeaters';
import {
  ScrollView,
  Text,
  View,
} from 'react-native'
import { Row, Col } from 'native-base';

export interface Props {
  grips: Array<Grip>
}
interface GripViewProps {
  grip: Grip
}
const GripView = ({ grip }: GripViewProps) =>
  <View>
    <Row>
      <Text> { grip.name } </Text>
    </Row>
      {grip.sets.map(({ setNumber, goalWeight, reps, }) => {
        return (
          <Row>
            <Col><Text>Set: { setNumber }</Text></Col>
            <Col><Text>Reps: { reps }</Text></Col>
            <Col><Text>Goal Weight: { goalWeight }</Text></Col>
            <Col><Text>Act. Weight: </Text></Col>
          </Row>
        )
      })}
  </View>

const Grips = ({ grips }: Props) => <ScrollView style={{height: 700}}>{ grips.map((grip, index) => <GripView key={index} grip={grip} />) }</ScrollView>
export default Grips
