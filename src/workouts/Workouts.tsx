import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Workout } from '../store';
import styled from 'styled-components/native';
import { setSelectedRepeater, repeater, Repeater } from '../hangboardRepeaters/hangboardRepeaterModel';
import { getWorkouts, setSelectedWorkoutAction } from '../models/workoutModel';
import {
  View,
  TouchableOpacity,
  Text,
} from 'react-native'

export interface MappedProps {
  workouts: Array<Workout>,
}

export interface MappedDispatch {
  setSelectedRepeater: (id: number) => void;  
}
export interface OwnProps {
  navigation: any
}
export type Props = OwnProps & MappedDispatch & MappedProps
const WorkoutDetailCard = styled.View`
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
class WorkoutsView extends React.PureComponent<Props, {}> {

  static navigationOptions = ({ navigation }: any) => ({
    headerTitle: <Text style={{color: 'white', fontSize: 20}}> Workouts </Text>,
    headerBackTitleStyle: {
      color: 'white'
    },
    headerStyle: {
      backgroundColor: '#274060',
    },
  })

  onWorkoutPress = (repeater: Repeater) => {
    this.props.setSelectedRepeater(repeater.id);
    this.props.navigation.navigate('HangboardRepeater')
  }
  render() {
    const {
      workouts,
    } = this.props;
    return (
      <View>
        {
          workouts.map((workout, idx) => (
            <TouchableOpacity activeOpacity={0.7} onPress={() => this.onWorkoutPress(workout)} key={idx}>
            <WorkoutDetailCard>
              <Title> { workout.name } </Title>
            </WorkoutDetailCard>
            </TouchableOpacity>
          ))
        }
      </View>
    )
  }
}

const mapStateToProps = (state: AppState): MappedProps => ({
  workouts: (Object as any).values(getWorkouts(state)),
});

const mapDispatchToProps = (dispatch: Dispatch<AppState>): MappedDispatch => ({
  setSelectedRepeater: (workoutId) => dispatch(setSelectedWorkoutAction({ workoutId }),
});

const Workouts = connect(mapStateToProps, mapDispatchToProps)(WorkoutsView);
export default Workouts;
