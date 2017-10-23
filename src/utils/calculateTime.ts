import { Repeater, Grip } from '../models/workoutModel';

const getGripTime = (grip: Grip, onDuration: number, offDuration: number) => {
  return grip.sets.reduce((acc, set) => {
      return acc + (set.reps * onDuration) + Math.max(set.reps - 1, 0) * offDuration
    }, 0);
}
const getGripStats = (grip: Grip, workout: Repeater) => {
  return getGripTime(grip, workout.onDuration, workout.offDuration)
}


export const calculateTime = (workout: Repeater) => {
  const {
    setCount,
    gripTime,
  } = workout.grips.reduce((acc, grip) => {

    const setCount = acc.setCount + grip.sets.length;
    const gripTime = acc.gripTime + getGripStats(grip, workout)
    return ({
      setCount,
      gripTime
    })
  }, { setCount: 0, gripTime: 0});

  return (
    Math.max(setCount - 1, 0) * workout.restDuration + gripTime
  )
}
