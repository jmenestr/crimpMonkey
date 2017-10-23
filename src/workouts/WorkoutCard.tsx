import * as React from 'react';
import { Repeater } from '../models/workoutModel';
import styled from 'styled-components/native';
import { TouchableOpacity, Text, View } from 'react-native';
import { calculateTime } from '../utils/calculateTime';
import { Icon, Row } from 'native-base';
import Card from '../commonComponents/Card';

import Swipeout from 'react-native-swipeout';

export interface OwnProps {
  workout: Repeater
  setSelectedRepeater: (id: number) => void;
  deleteRepeater: (id: number) => void;
  navigation: any;
}

const WorkoutDetailCard = styled.View`
marginTop: 5;
marginBottom: 5;
backgroundColor: #335C81;
`;

const Title = styled.Text`
color: white;
fontSize: 20;
paddingTop: 5;
paddingBottom: 5;
fontWeight: 900;
`;

export default class WorkoutCard extends React.PureComponent<OwnProps, {}> {
  onWorkoutPress = () => {
    const { workout, navigation } = this.props
    this.props.setSelectedRepeater(workout.id as number);
    this.props.navigation.navigate('HangboardRepeater')
  }

  onWorkoutDelete = () => {
    this.props.deleteRepeater(this.props.workout.id as number);
  }
  render() {
      const { workout } = this.props
      return (
        <Swipeout style={{marginTop: 5, marginBottom: 5}} left={[ {text: 'Delete', type: 'delete', backgroundColor: '#FE5F55', onPress: this.onWorkoutDelete}]}>
          <Card 
            cardTitle={workout.name}
            headerRight={() => 
              <TouchableOpacity activeOpacity={0.7} onPress={this.onWorkoutPress}>
                <Icon style={{color: 'white', fontSize: 15}} name='md-create' />
              </TouchableOpacity>
            }
            content={() => 
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}} >
                <Icon style={{color: 'white', fontSize: 18}} name='md-repeat' >{ workout.grips.length }</Icon>
                <Icon style={{color: 'white', fontSize: 18}} name='md-timer' > ≈ { Math.floor(calculateTime(workout) / 60) } min</Icon>
              </View>
            }
          />
        </Swipeout>
        );
    }
}

