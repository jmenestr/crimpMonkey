import * as React from 'react';
import { GripSet } from './HangboardRepeaters';
import styled from 'styled-components/native';
import { Row, Col } from 'native-base';
import {
  View,
  Text,
} from 'react-native'

interface Props {
  set: GripSet
}

const BodyText = styled.Text`
  color: #E0E4E8;
  fontSize: 16;
`
const SetPropView = styled(Col)`
  backgroundColor: #506487;
  paddingTop: 5;
  paddingLeft: 10;
  paddingRight: 10;
  paddingBottom: 5;
  borderColor: #3D4C67;
  borderWidth: 1;
`
const GripSetView = ({ set }: Props) => (
  <Row key={set.setNumber}>
    <SetPropView>
      <Row style={{justifyContent: 'center'}}>
        <BodyText>{ set.setNumber}</BodyText>
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
