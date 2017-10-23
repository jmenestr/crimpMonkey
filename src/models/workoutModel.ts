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

const getEmptyGripSet = (num: number): GripSet => ({
  setNumber: num,
  goalWeight: 0,
  reps: 0,
  complete: false,
});

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
}


export interface Repeater {
  name: string;
  id?: number;
  hangboardType: string,
  date: Date;
  restDuration: number;
  onDuration: number;
  offDuration: number;
  grips: Array<Grip>
}
const getEmptyRepeater = (): Repeater => ({
  name: '',
  hangboardType: '',
  date: new Date(),
  restDuration: 0,
  onDuration: 0,
  offDuration: 0,
  grips: [], 
});

export interface WorkoutState {
  workouts: {
    workoutById?: {
      [key: string]: Repeater
    },
    selectedWorkoutId: number | null,
    editableWorkout?: {
      details: RepeaterDetails,
      grips: Array<Grip>,
      selectedGripIndex?: number | null,
      editableGrip: Grip,
      
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
const editableGripPath = `${editableWorkoutPath}.editableGrip`
const editableSetsPath = `${editableGripPath}.sets`;

export const getWorkout = (id: number, state: WorkoutState): Repeater =>
  fp.get(`${workoutByIdPath}[${id}]`, state)
export const getSelectedWorkoutId = (state: WorkoutState): number => fp.get(selectedWorkoutIdPath, state)
export const getSelectedWorkout = (state: WorkoutState): Repeater =>
  getWorkout(getSelectedWorkoutId(state), state);
export const getWorkouts = (state: WorkoutState): { [key: string]: Repeater } => fp.get(workoutByIdPath, state);

export const getEditableDetails = (state: WorkoutState) => fp.get(detailsPath, state);
export const getEditableName = (state: WorkoutState) => fp.get(`${detailsPath}.name`, state);
export const getEditableHangboardType = (state: WorkoutState) => fp.get(`${detailsPath}.hangboardType`, state);
export const getEditableRestDuration = (state: WorkoutState) => fp.get(`${detailsPath}.restDuration`, state);
export const getEditableOnDuration = (state: WorkoutState) => fp.get(`${detailsPath}.onDuration`, state);
export const getEditableOffDuration = (state: WorkoutState) => fp.get(`${detailsPath}.offDuration`, state);
export const getEditableGrips = (state: WorkoutState): Array<Grip> => fp.get(gripsPath, state)
export const getEditableGrip = (state: WorkoutState): Grip => fp.get(editableGripPath, state);
export const getEditableWorkoutId = (state: WorkoutState): number => fp.get(workoutIdPath, state)
export const getSelectedGripId = (state: WorkoutState): number | undefined => fp.getOr(undefined, selectedGripIdPath, state)

export const receiveWorkoutsAction = actionCreator<{ workouts: Array<Repeater>}>('RECEIVE_WORKOUTS');
export const deleteWorkoutAction = actionCreator<{ workoutId: number}>('DELETE_WORKOUT');
export const setSelectedWorkoutAction = actionCreator<{ workoutId: number}>('SET_SELECTED_WORKOUT');
export const setNewWorkout = actionCreator<{}>('SET_NEW_WORKOUT');
export const setSelectedGripAction = actionCreator<{ gripIndex: number | undefined}>('SET_SELECTED_GRIP');
export const updatedSelectedGripAction = actionCreator<{ grip: Grip }>('UPDATED_SELECTED_GRIP');
export const updateWorkoutDetailsAction = actionCreator<{ key: Partial<RepeaterDetailKeys>, value: string | number}>('UPDATE_REPEATER_DETAILS');
export const saveWorkoutAction = actionCreator<{}>('SAVE_WORKOUT');
export const updateGripNameAction = actionCreator<{name: string}>('UPDATE_GRIP_NAME');
export const saveGripAction = actionCreator<{}>('SAVE_GRIP');

export const updateSetReps = actionCreator<{ index: number, repCount: number}>('UPDATE_SET_REP');
const updateRepsHandler = (state: WorkoutState, payload: { index: number, repCount: number}) => {
  const {
    index,
    repCount
  } = payload;
  const sets = getEditableGrip(state).sets;
  const updatedSets = [...sets];
  const updatedSet = fp.set('reps', repCount, updatedSets[index])
  updatedSets.splice(index, 1, updatedSet)
  return fp.set(editableSetsPath, updatedSets, state);
}
export const updateSetWeight = actionCreator<{ index: number, weight: number}>('UPDATE_SET_WEIGHT');
const updateWeightHandler = (state: WorkoutState, payload: { index: number, weight: number}) => {
  const {
    index,
    weight
  } = payload;
  const sets = getEditableGrip(state).sets;
  const updatedSets = [...sets];
  const updatedSet = fp.set('goalWeight', weight, updatedSets[index])
  updatedSets.splice(index, 1, updatedSet)
  return fp.set(editableSetsPath, updatedSets, state);
}
export const addGripSet = actionCreator<{}>('ADD_GRIP_SET');
const addGripSetHandler = (state: WorkoutState) => {
  const sets = getEditableGrip(state).sets;
  const newSet = getEmptyGripSet(sets.length + 1);
  return fp.set(editableSetsPath, sets.concat([newSet]), state);
}

const receiveWorkouts = (state: WorkoutState, payload: { workouts: Array<Repeater> }) => {
  const { workouts } = payload;
  const myIds = workouts.reduce((acc, workout) => {
    acc[workout.id] = workout;
    return acc;
  }, {} as { [key: string]: Repeater })
  return fp.set(workoutByIdPath, myIds, state)
}
const deleteWorkout = (state: WorkoutState, payload: { workoutId: number}) => {
  const workouts = {...getWorkouts(state)};
  delete workouts[payload.workoutId]
  return fp.set(
    workoutByIdPath,
    workouts,
  )(state);
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
const setNewWorkoutHandler = (state: WorkoutState) => {
  const {grips, ...details} = getEmptyRepeater();
  return fp.flow(
    fp.set(selectedWorkoutIdPath, undefined),
    fp.set(detailsPath, details),
    fp.set(gripsPath, grips),
  )(state);
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
    id: !!selectedWorkoutId ? selectedWorkoutId : Math.random(),
    ...details,
    grips,
  }
  return fp.flow(
    fp.set(`${workoutByIdPath}[${newWorkout.id}]`, newWorkout),
  )(state);
}
const setSelectedGrip = (state: WorkoutState, payload: { gripIndex: number | undefined}) => {
  const idx = payload.gripIndex;
  const editableGrip = fp.isNumber(idx) ? getEditableGrips(state)[idx as number] : { name: '', sets: [] }
  return fp.flow(
    fp.set(selectedGripIdPath, idx),
    fp.set(editableGripPath, fp.cloneDeep(editableGrip))
  )(state)
}
const updateGripName = (state: WorkoutState, payload: { name: string }) => {
  return fp.set(
    `${editableGripPath}.name`,
    payload.name
  )(state)
}

const addNewGrip = (newGrip: Grip, grips: Array<Grip>) => grips.concat([newGrip]);

const updateExistingGrip = (newGrip: Grip, grips: Array<Grip>, indexToSave: number) => {
  const copiedGrips = [...grips];
  copiedGrips.splice(indexToSave, 1, newGrip)
  return copiedGrips;
}
const saveGrip = (state: WorkoutState, payload: {}) => {
  const indexToSave = getSelectedGripId(state);
  const grips = getEditableGrips(state);
  const newGrip = getEditableGrip(state);
  const newGrips = !indexToSave ? addNewGrip(newGrip, grips) : updateExistingGrip(newGrip, grips, indexToSave as number);
  return fp.set(gripsPath, newGrips, state);
}



const workoutReducer =
  reducerWithInitialState({ workouts: {} })
  .case(receiveWorkoutsAction, receiveWorkouts)
  .case(deleteWorkoutAction, deleteWorkout)
  .case(setSelectedWorkoutAction, setSelectedWorkout)
  .case(updateWorkoutDetailsAction, updateEditableWorkoutDetail)
  .case(saveWorkoutAction, saveEditableWorkout)
  .case(setSelectedGripAction, setSelectedGrip)
  .case(updateGripNameAction, updateGripName)
  .case(saveGripAction, saveGrip)
  .case(addGripSet, addGripSetHandler)
  .case(updateSetReps, updateRepsHandler)
  .case(updateSetWeight, updateWeightHandler)
  .case(setNewWorkout, setNewWorkoutHandler)

export default workoutReducer;
