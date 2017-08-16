import * as React from 'react';
import HangboardRepeaterHeader from './HangboardRepeaterHeader';
import {
  View,
  Text,
} from 'react-native';
import { Container, Content } from 'native-base'
import HangboardRepeaterDetails from "./HangboardRepeaterDetails";
import Grips from "./Grips";

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

interface State {
  repeater: Repeater
}

const grips: Array<Grip> = [
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
  },{
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
  },{
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
  }
]
const repeater: Repeater = {
  name: 'Example Repeater',
  date: new Date(),
  restDuration: 180,
  onDuration: 7,
  offDuration: 3,
  grips,
}
export default class HangboardRepeaters extends React.PureComponent<{}, State> {
  state: State = {
    repeater
  }

  render() {
    const {
      repeater
    } = this.state;
    return (
      <Container>
        <HangboardRepeaterHeader />
        <Content>
          <HangboardRepeaterDetails repeater={repeater}  />
          <Grips grips={repeater.grips} />
        </Content>
      </Container>
    )
  }
}
