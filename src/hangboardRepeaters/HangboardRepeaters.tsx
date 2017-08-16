import * as React from 'react';
import HangboardRepeaterHeader from './HangboardRepeaterHeader';
import {
  View,
  Text,
} from 'react-native';
import { Container, Content, Icon, Button, } from 'native-base';
import HangboardRepeaterDetails from "./HangboardRepeaterDetails";
import Grips from "./Grips";
import { lightBlue } from '../styles';

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
export default class HangboardRepeater extends React.PureComponent<{}, State> {

  static navigationOptions = ({navigation}: any) => ({
    headerTitle: <Text>STuff</Text>,
    headerRight: <Button title='Edit' onPress={() => navigation.navigate('Edit')} />,
    headerBackTitle: 'stuff',
    headerStyle: {
      backgroundColor: lightBlue,
      shadowColor: 'black',
      shadowOffset: { width: 5, height: 20}
    },

    headerTintColor: 'white'
  })

  state: State = {
    repeater
  }

  render() {
    const {
      repeater
    } = this.state;
    return (
      <View>
        <Text> Hangboard Screen </Text>
      </View>
      // <Container>
      //   <HangboardRepeaterHeader />
      //   <Content>
      //     <HangboardRepeaterDetails repeater={repeater}  />
      //     <Grips grips={repeater.grips} />
      //   </Content>
      // </Container>
    )
  }
}
