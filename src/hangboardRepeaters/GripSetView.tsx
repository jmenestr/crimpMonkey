import * as React from 'react';
import styled from 'styled-components/native';
import { Row, Col } from 'native-base';
import {
  View,
  Text,
} from 'react-native'
import { GripSet } from './hangboardRepeaterModel';

interface Props {
  set: GripSet,
  navigation: any
}

const BodyText = styled.Text`
  color: #E0E4E8;
  fontSize: 16;
`
const SetPropView = styled(Col)`
  backgroundColor: #335C81;
  paddingTop: 5;
  paddingLeft: 10;
  paddingRight: 10;
  paddingBottom: 5;
  borderBottomColor: #39668f;
  borderRightColor: #39668f;
  borderLeftColor: #2d5273;
  borderTopColor: #2d5273;
  borderWidth: 1;
`
const GripSetView = ({ set, navigation }: Props) => (
  <Row key={set.setNumber}>
    <SetPropView>
      <Row style={{justifyContent: 'center'}}>
        <BodyText>{ set.reps}</BodyText>
        <BodyText> reps</BodyText>
        </Row>
      </SetPropView>
    <SetPropView>
      <Row style={{justifyContent: 'center'}}>
        <BodyText>{ set.goalWeight}</BodyText>
        <BodyText> lbs </BodyText>
      </Row>
    </SetPropView>
  </Row>
)

export default GripSetView;
