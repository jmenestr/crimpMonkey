import * as _ from 'lodash/fp'
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from "typescript-fsa-reducers";

const fp = _ as any;

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

export type RepeaterDetails = 'name' | 'hangboardType' | 'restDuration' | 'OffDuration' | 'onDuration'
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
  fp.get(`${workoutByIdPath}[${id}]`, state)
export const getSelectedWorkout = (state: WorkoutState): Repeater =>
  getWorkout(fp.get(selectedWorkoutIdPath, state), state);
export const getWorkouts = (state: WorkoutState) => fp.get(workoutByIdPath, state);

export const getEditableWorkout = (state: WorkoutState) => fp.get(editableWorkoutPath, state);
export const getEditableName = (state: WorkoutState) => fp.get(`${editableWorkoutPath}.name`, state);
export const getEditableHangboardType = (state: WorkoutState) => fp.get(`${editableWorkoutPath}.hangboardType`, state);

export const receiveWorkoutsAction = actionCreator<{ workouts: Array<Repeater>}>('RECEIVE_WORKOUTS');
export const setSelectedWorkoutAction = actionCreator<{ workoutId: number}>('SET_SELECTED_WORKOUT');
export const updateWorkoutDetailsAction = actionCreator<{ key: Partial<RepeaterDetails>, value: string | number}>('UPDATE_REPEATER_DETAILS');

const receiveWorkouts = (state: WorkoutState, payload: { workouts: Array<Repeater> }) => {
  const { workouts } = payload;
  const myIds = workouts.reduce((acc, workout) => {
    acc[workout.id] = workout;
    return acc;
  }, {} as { [key: string]: Repeater })
  return fp.set(workoutByIdPath, myIds, state)
}

const setSelectedWorkout = (state: WorkoutState, payload: { workoutId: number}) => {
  const { workoutId } = payload;
  const workout = fp.cloneDeep(getWorkout(workoutId, state));
  return fp.flow(
    fp.set(editableWorkoutPath, workout),
    fp.set(selectedWorkoutIdPath, workoutId),
  )(state)
}

const updateEditableWorkoutDetail = (state: WorkoutState, payload: { key: Partial<RepeaterDetails>, value: string | number}) => {
  const {
    key,
    value
  } = payload
  return fp.set( `${editableWorkoutPath}.${key}`, value, state)
}
const workoutReducer =
  reducerWithInitialState({ workouts: {} })
  .case(receiveWorkoutsAction, receiveWorkouts)
  .case(setSelectedWorkoutAction, setSelectedWorkout)
  .case(updateWorkoutDetailsAction, updateEditableWorkoutDetail)

export default workoutReducer;
