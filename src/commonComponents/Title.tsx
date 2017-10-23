import * as React from 'react';
import { Repeater, WorkoutState, getSelectedWorkout } from '../models/workoutModel';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import {
  View,
  Text
} from 'react-native'

const StyledTitle = styled.Text`
  color: white;
  fontSize: 20;
`
const Title = ({ title }: { title: string}) =>
  <StyledTitle>{ title }</StyledTitle>

export default Title;
