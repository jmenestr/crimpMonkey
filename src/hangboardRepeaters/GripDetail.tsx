import * as React from 'react';
import { Grip } from './HangboardRepeaters';
import styled from 'styled-components/native';
import GripSetView from './GripSetView';
import { Col, Row } from 'native-base';
import {
  View,
  Text,
} from 'react-native';

export interface OwnProps {
  grip: Grip
}

const GripDetailCard = styled.View`
  backgroundColor: #1B2845;
  marginTop: 5;
  marginBottom: 5;
`;

const Title = styled.Text`
  color: white;
  fontSize: 18;
  paddingTop: 5;
  paddingBottom: 5;
  fontWeight: 900;
`;

export default class GripDetail extends React.PureComponent<OwnProps, {}> {
  render() {
    const {
      name,
      sets,
    } = this.props.grip;
    return (
      <GripDetailCard>
        <Title> { name }</Title>
        {
          sets.map((set, idx) => <GripSetView key={idx} set={set} />)
        } 
      </GripDetailCard>
    )
  }
}
