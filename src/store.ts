import { createStore } from 'redux'
import { Grip, Repeater } from './models/workoutModel';
import workoutReducer from './models/workoutModel';

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

export const grips2: Array<Grip> = [
  {
    name: 'Sloper',
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
    name: '2 Finger Pocket',
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


export const repeater1: Repeater = {
  name: 'Example Repeater',
  id: 1,
  hangboardType: 'Beastmaker',
  date: new Date(),
  restDuration: 180,
  onDuration: 7,
  offDuration: 3,
  grips,
}

export const repeater2: Repeater = {
  name: 'Hard Workout',
  id: 2,
  hangboardType: 'Beastmaker',
  date: new Date(),
  restDuration: 180,
  onDuration: 7,
  offDuration: 3,
  grips: grips2,
}
export type Workout = Repeater;
const initialState = {
  workouts: {
    workoutById: {
      [repeater1.id]: repeater1,
      [repeater2.id]: repeater2,
    }
  }
}
const store = createStore(workoutReducer, initialState);
export default store
