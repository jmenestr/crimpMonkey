import * as _ from 'lodash'
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from "typescript-fsa-reducers";

const actionCreator = actionCreatorFactory();

export interface GripSet {
  setNumber: number;
  goalWeight: number;
  actualWeight?: number;
  reps: number;
  complete: boolean;
}
export interface Grip {
  name: string;
  sets: Array<GripSet>;
}

export interface Repeater {
  name: string;
  id: number;
  hangboardType: string,
  date: Date;
  restDuration: number;
  onDuration: number;
  offDuration: number;
  grips: Array<Grip>
}

export interface WorkoutState {
  workouts: {
    workoutById?: {
      [key: string]: Repeater
    },
    selectedWorkoutId?: number,
    editableWorkoutState?: Repeater
  }
}

export const rootPath = 'workouts'
export const workoutByIdPath = `${rootPath}.workoutById`;
export const selectedWorkoutIdPath = `${rootPath}.selectedWorkoutId`;
export const editableWorkoutPath = `${rootPath}.editableWorkoutState`;

export const getWorkout = (id: number, state: WorkoutState): Repeater =>
  _.get(state, `${workoutByIdPath}[${id}]`)
export const getSelectedWorkout = (state: WorkoutState): Repeater =>
  getWorkout(_.get(state, selectedWorkoutIdPath), state);
export const getWorkouts = (state: WorkoutState) => _.get(state, workoutByIdPath);

export const receiveWorkoutsAction = actionCreator<{ workouts: Array<Repeater>}>('RECEIVE_WORKOUTS');
export const setSelectedWorkoutAction = actionCreator<{ workoutId: number}>('SET_SELECTED_WORKOUT');
export const setEditableWorkoutAction = actionCreator<{ workoutId: number}>('SET_EDITABLE_WORKOUT');

const receiveWorkouts = (state: WorkoutState, payload: { workouts: Array<Repeater> }) => {
  const { workouts } = payload;
  const myIds = workouts.reduce((acc, workout) => {
    acc[workout.id] = workout;
    return acc;
  }, {} as { [key: string]: Repeater })
  return _.set<WorkoutState>(state, workoutByIdPath, myIds)
}

const setSelectedWorkout = (state: WorkoutState, payload: { workoutId: number}) => {
  const { workoutId } = payload;
  return _.set<WorkoutState>(state, selectedWorkoutIdPath, workoutId)
}

const setEditableWorkout = (state: WorkoutState, payload: { workoutId: number }) => {
  const { workoutId } = payload;
  const workout = { ...getWorkout(workoutId, state) }
  return _.set<WorkoutState>(state, editableWorkoutPath, workout);
}

const workoutReducer =
  reducerWithInitialState({ workouts: {} })
  .case(receiveWorkoutsAction, receiveWorkouts)
  .case(setSelectedWorkoutAction, setSelectedWorkout)
  .case(setEditableWorkoutAction, setEditableWorkout)

export default workoutReducer;
