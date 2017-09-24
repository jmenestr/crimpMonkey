import * as React from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
} from 'react-native';
import { Row, Col } from 'native-base';
import styled from 'styled-components/native';
import { Repeater } from '../models/workoutModel';

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

const WhiteText = styled.Text`
color: white;
`

const RepeaterDetails = ({ repeater }: { repeater: Repeater }) => 
  <View style={{ height: 100, backgroundColor: '#335C81'}}>
  <Row style={{ justifyContent: 'center', alignItems: 'center'}}>
    <Text style={{fontSize: 20, color: 'white'}} > { repeater.name }</Text>
  </Row>
  <Row>
    <SetPropView>
      <WhiteText>Hang Duration</WhiteText>
      <WhiteText> { repeater.onDuration }</WhiteText>
    </SetPropView>
    <SetPropView>
      <WhiteText>Off Duration</WhiteText>
      <WhiteText> { repeater.offDuration }</WhiteText>
    </SetPropView>
    <SetPropView>
      <WhiteText>Rest Duration</WhiteText>
      <WhiteText> { repeater.restDuration }</WhiteText>
    </SetPropView>
  </Row>
  </View>

export default RepeaterDetails;
