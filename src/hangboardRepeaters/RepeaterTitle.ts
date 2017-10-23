import { Repeater, WorkoutState, getSelectedWorkout } from '../models/workoutModel';
import { connect } from 'react-redux';
import Title from '../commonComponents/Title';

  
const mapStateToProps = (state: WorkoutState) => ({
  title: getSelectedWorkout(state).name,
})

const mapDispatchToProps = () => ({})

const RepeaterTitle = connect(mapStateToProps, mapDispatchToProps)(Title);
export default RepeaterTitle;
