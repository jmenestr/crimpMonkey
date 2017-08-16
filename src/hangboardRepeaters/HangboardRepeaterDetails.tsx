import * as React from 'react';
import styled from 'styled-components/native';

import {
  View,
  Text,
} from 'react-native';
import {
  Content,
  Card,
  Grid,
  Col,
  Item,
  Label,
  Input,
  Form,
  Row,
} from 'native-base'
import { Repeater } from "./HangboardRepeaters";

export interface Props {
  repeater: Repeater
}

const StyledCard = styled(Card)`
  backgroundColor: black;
`;

const StyledText = styled.Text`
  color: white;
`;
export default class HangboardRepeaterDetails extends React.PureComponent<Props, {}> {
  render() {
    const {
      repeater: {
        name,
        date,
        onDuration,
        offDuration,
        restDuration,
      }
    } = this.props
    return (
        <StyledCard>
        <Form>
          <Grid>
            <Row><StyledText>Name: { name } </StyledText></Row>
            <Row><Text>Date {date.toDateString()}</Text></Row>
            <Row>
              <Col><Text>On: { onDuration }</Text></Col>
              <Col><Text>Off: { offDuration }</Text></Col>
              <Col><Text>Rest: { restDuration}</Text></Col>
            </Row>
          </Grid>
          </Form>
        </StyledCard>
    )
  }
}
