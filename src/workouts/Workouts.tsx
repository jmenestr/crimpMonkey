import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Workout } from '../store';
import { getWorkouts, setSelectedWorkoutAction, WorkoutState, deleteWorkoutAction } from '../models/workoutModel';
import { Icon } from 'native-base';
import AddRepeaterButtom from '../hangboardRepeaters/AddRepeaterButton';
import WorkoutCard from './WorkoutCard';
import Title from '../commonComponents/Title';
import {
  Text,
  ScrollView,
} from 'react-native'

export interface MappedProps {
  workouts: Array<Workout>,
}

export interface MappedDispatch {
  setSelectedRepeater: (id: number) => void;
  deleteWorkout: (workoutId: number) => void;
}
export interface OwnProps {
  navigation: any
}
export type Props = OwnProps & MappedDispatch & MappedProps
class WorkoutsView extends React.PureComponent<Props, {}> {

  static navigationOptions = ({ navigation }: any) => ({
    headerTitle: <Title title='Workouts' />,
    headerRight: <AddRepeaterButtom navigation={navigation} />,
    headerBackTitleStyle: {
      color: 'white'
    },
    headerStyle: {
      backgroundColor: '#274060',
    },
  })

  render() {
    const {
      workouts,
      setSelectedRepeater,
      deleteWorkout,
      navigation
    } = this.props;
    return (
      <ScrollView>
        {
          workouts.map((workout, idx) =>
            <WorkoutCard key={idx} workout={workout} navigation={navigation} setSelectedRepeater={setSelectedRepeater} deleteRepeater={deleteWorkout} />
          )
        }
      </ScrollView>
    )
  }
}

const mapStateToProps = (state: WorkoutState): MappedProps => ({
  workouts: (Object as any).values(getWorkouts(state)),
});

const mapDispatchToProps = (dispatch: Dispatch<WorkoutState>): MappedDispatch => ({
  setSelectedRepeater: (workoutId) => dispatch(setSelectedWorkoutAction({ workoutId })),
  deleteWorkout: (workoutId: number) => dispatch(deleteWorkoutAction({ workoutId})),
});

const Workouts = connect(mapStateToProps, mapDispatchToProps)(WorkoutsView);
export default Workouts;
