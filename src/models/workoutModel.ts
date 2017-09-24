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

export type RepeaterDetailKeys = 'name' | 'hangboardType' | 'restDuration' | 'offDuration' | 'onDuration'
export interface RepeaterDetails {
  name: string;
  hangboardType: string,
  date: Date;
  restDuration: number;
  onDuration: number;
  offDuration: number;
  grips: Array<Grip>
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
    selectedWorkoutId: number | null,
    editableWorkoutState?: {
      details: RepeaterDetails,
      grips: Array<Grip>,
      selectedGripIndex?: number | null,
    }
  }
}

const rootPath = 'workouts'
const workoutByIdPath = `${rootPath}.workoutById`;
const selectedWorkoutIdPath = `${rootPath}.selectedWorkoutId`;
const editableWorkoutPath = `${rootPath}.editableWorkout`;
const workoutIdPath = `${editableWorkoutPath}.workoutId`
const detailsPath = `${editableWorkoutPath}.details`
const gripsPath = `${editableWorkoutPath}.grips`
const selectedGripIdPath = `${editableWorkoutPath}.selectedGripIndex`

export const getWorkout = (id: number, state: WorkoutState): Repeater =>
  fp.get(`${workoutByIdPath}[${id}]`, state)
export const getSelectedWorkoutId = (state: WorkoutState): number => fp.get(selectedWorkoutIdPath, state)
export const getSelectedWorkout = (state: WorkoutState): Repeater =>
  getWorkout(getSelectedWorkoutId(state), state);
export const getWorkouts = (state: WorkoutState) => fp.get(workoutByIdPath, state);

export const getEditableDetails = (state: WorkoutState) => fp.get(detailsPath, state);
export const getEditableName = (state: WorkoutState) => fp.get(`${detailsPath}.name`, state);
export const getEditableHangboardType = (state: WorkoutState) => fp.get(`${detailsPath}.hangboardType`, state);
export const getEditableRestDuration = (state: WorkoutState) => fp.get(`${detailsPath}.restDuration`, state);
export const getEditableOnDuration = (state: WorkoutState) => fp.get(`${detailsPath}.onDuration`, state);
export const getEditableOffDuration = (state: WorkoutState) => fp.get(`${detailsPath}.offDuration`, state);
export const getEditableGrips = (state: WorkoutState): Array<Grip> => fp.get(gripsPath, state)
export const getSelectedGrip = (state: WorkoutState): Grip => {
  const index = getSelectedGripId(state);
  return fp.isNumber(index) ? getEditableGrips(state)[index] : { name: '', sets: [] };
}
export const getEditableWorkoutId = (state: WorkoutState): number => fp.get(workoutIdPath, state)
export const getSelectedGripId = (state: WorkoutState): number | undefined => fp.getOr(undefined, selectedGripIdPath, state)

export const receiveWorkoutsAction = actionCreator<{ workouts: Array<Repeater>}>('RECEIVE_WORKOUTS');
export const setSelectedWorkoutAction = actionCreator<{ workoutId: number}>('SET_SELECTED_WORKOUT');
export const setSelectedGripAction = actionCreator<{ gripIndex: number | undefined}>('SET_SELECTED_GRIP');
export const updatedSelectedGrip = actionCreator<{ grip: Grip }>('UPDATED_SELECTED_GRIP');
export const updateWorkoutDetailsAction = actionCreator<{ key: Partial<RepeaterDetailKeys>, value: string | number}>('UPDATE_REPEATER_DETAILS');
export const saveWorkoutAction = actionCreator<{}>('SAVE_WORKOUT');

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
  const {
    id,
    grips,
    ...details
  } = workout
  return fp.flow(
    fp.set(selectedWorkoutIdPath, workoutId),
    fp.set(detailsPath, details),
    fp.set(gripsPath, grips),
  )(state)
}

const updateEditableWorkoutDetail = (state: WorkoutState, payload: { key: Partial<RepeaterDetailKeys>, value: string | number}) => {
  const {
    key,
    value
  } = payload
  return fp.set( `${detailsPath}.${key}`, value, state)
}

const saveEditableWorkout = (state: WorkoutState, payload: {}) => {
  const selectedWorkoutId = getSelectedWorkoutId(state);
  const details = getEditableDetails(state);
  const grips = getEditableGrips(state);
  const newWorkout = {
    id: selectedWorkoutId,
    ...details,
    grips,
  }
  return fp.flow(
    fp.set(`${workoutByIdPath}[${selectedWorkoutId}]`, newWorkout),
  )(state);
}

const setSelectedGrip = (state: WorkoutState, payload: { gripIndex: number | undefined}) => fp.set(selectedGripIdPath, payload.gripIndex, state)
const workoutReducer =
  reducerWithInitialState({ workouts: {} })
  .case(receiveWorkoutsAction, receiveWorkouts)
  .case(setSelectedWorkoutAction, setSelectedWorkout)
  .case(updateWorkoutDetailsAction, updateEditableWorkoutDetail)
  .case(saveWorkoutAction, saveEditableWorkout)
  .case(setSelectedGripAction, setSelectedGrip)

export default workoutReducer;
