import * as React from 'react';
import styled from 'styled-components/native';
import { Icon } from 'native-base';
import {
  View,
  Text,
} from 'react-native'

const CardView = styled.View`
`;

const padding = `
paddingTop: 10;
paddingBottom: 10;
paddingRight: 7;
paddingLeft: 7;
`
const CardTitleRow = styled.View`
  flexDirection: row;
  backgroundColor: #1B2845;
  justifyContent: space-between;
  alignContent: center;
  ${padding}
  borderBottomWidth: 1;
  borderColor: #447aab;
`;

const CardTitleView = styled.View`
  backgroundColor: #1B2845;
`

const CardTitle = styled.Text`
  fontWeight: 700;
  color: white;
  fontSize: 15;
`
const CardContent = styled.View`
  backgroundColor: #335C81;
  ${padding}
`
export interface OwnProps {
  cardTitle: string;
  content: () => JSX.Element
  headerRight?: () => JSX.Element
}
const Card = ({ cardTitle, headerRight, content}: OwnProps) =>
  <CardView>
    <CardTitleRow>
        <CardTitle>{ cardTitle }</CardTitle>
      <CardTitleView>
        { headerRight ? headerRight() : null}
      </CardTitleView>
    </CardTitleRow>
    <CardContent>
      { content() }
    </CardContent>
  </CardView>

export default Card
