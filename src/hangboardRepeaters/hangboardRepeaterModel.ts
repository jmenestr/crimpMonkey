import * as r from 'ramda'
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from "typescript-fsa-reducers";

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
  date: Date;
  restDuration: number;
  onDuration: number;
  offDuration: number;
  grips: Array<Grip>
}

export interface RepeaterState {
  selectedRepeater: Repeater
}

export const rootPath = 'selectedRepeater'
export const namePath = `${rootPath}.name`
export const restDurationPath = `${rootPath}.restDuration`
export const offDurationPath = `${rootPath}.offDuration`
export const onDurationPath = ` ${rootPath}.onDuration`
export const gripsPath = `${rootPath}.grips`

export const getRepeater = (state: RepeaterState) => r.prop<Repeater>(rootPath)(state)
export const getName = (state: RepeaterState) => r.prop<string>(namePath)(state)
export const getRestDuration = (state: RepeaterState) => r.prop<number>(restDurationPath, state)
export const getOffDuration = (state: RepeaterState) => r.prop<number>(offDurationPath, state)
export const getOnDuration = (state: RepeaterState) => r.prop<number>(onDurationPath, state)
export const getGrips = (state: RepeaterState) => r.prop<Array<Grip>>(gripsPath, state)

export const actionCreator = actionCreatorFactory()

export const setSelectedRepeater = actionCreator<{ repeater: Repeater }>('SELECT_REPEATER')
export const updateRepeaterName = actionCreator<{ name: string }>('UPDATE_REPEATER_NAME')
export const updateRestDuration = actionCreator<{ duration: number }>('UPDATE_REST_DURATION')
export const updateOffDuration = actionCreator<{ duration: number }>('UPDATE_OFF_DURATION')
export const updateOntDuration = actionCreator<{ duration: number }>('UPDATE_ON_DURATION')
export const addGrip = actionCreator<{ grip: Grip}>('ADD_GRIP')


export const grips: Array<Grip> = [
  {
    name: 'Jug',
    sets: [
      {
        setNumber: 1,
        goalWeight: 30,
        reps: 7,
        complete: false
      },
      {
        setNumber: 2,
        goalWeight: 40,
        reps: 7,
        complete: false
      }
    ]
  },
  {
    name: '2 Finger Pad',
    sets: [
      {
        setNumber: 1,
        goalWeight: 30,
        reps: 7,
        complete: false
      },
      {
        setNumber: 2,
        goalWeight: 40,
        reps: 7,
        complete: false
      },
      {
        setNumber: 3,
        goalWeight: 40,
        reps: 7,
        complete: false
      }
    ]
  }
]

export const repeater: Repeater = {
  name: 'Example Repeater',
  date: new Date(),
  restDuration: 180,
  onDuration: 7,
  offDuration: 3,
  grips,
}

const reducer = reducerWithInitialState({ selectedRepeater: repeater })

export default reducer
