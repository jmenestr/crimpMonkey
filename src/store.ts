import { createStore } from 'redux'
import { Grip, Repeater } from "./hangboardRepeaters/hangboardRepeaterModel";
import reducer from './hangboardRepeaters/hangboardRepeaterModel';


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

interface State {
  workouts: Array<Repeater>,
  selectedRepeater: null | Repeater,
}

const store = createStore(reducer)
export default store
