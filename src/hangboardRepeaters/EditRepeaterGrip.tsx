import * as React from 'react';
import { Row, Col } from 'native-base';
import { Grip } from './hangboardRepeaterModel';
import GripSetView from './GripSetView';
import styled from 'styled-components/native';
import NumericInput from '../commonComponents/NumericInput';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native'


export interface Props {
  grip: Grip,
  navigation: any
}
const grip = {
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

const getNewSet = () => ({
  setNumber: 3,
  goalWeight: 0,
  reps: 0,
  complete: false
})

const GripDetailCard = styled.View`
backgroundColor: #1B2845;
marginTop: 5;
marginBottom: 5;
`;

const Title = styled.Text`
color: white;
fontSize: 18;
paddingTop: 5;
paddingBottom: 5;
fontWeight: 900;
`;

const SetDetailsView = styled.View`
backgroundColor: #335C81;
paddingTop: 5;
paddingLeft: 10;
paddingRight: 10;
paddingBottom: 5;
borderBottomColor: #39668f;
borderTopColor: #2d5273;
borderWidth: 1;
display: flex;
flexDirection: row;
justifyContent: center;
alignItems: center;
`
export default class EditRepeaterGrip extends React.PureComponent<Props, {}> {
  static navigationOptions = ({ navigation }: any) => ({
    headerStyle: {
      backgroundColor: '#274060',
    },
    headerBackTitleStyle: {
      color: 'white'
    },
    headerTintColor: 'white'
  })
  
  addSet = () => {
    grip.sets.push(getNewSet())
    this.forceUpdate()
  }
  render() {
    const {
      name,
      sets
    } = grip
    return (
      <View style={{flex: 1}}>
        <View style={{height: 30, marginBottom: 5, backgroundColor: '#BDD5EA'}}>
          <Row>
            <Col>
              <TextInput
                style={{height: 30, borderColor: '#1B2845', borderBottomWidth: 1, paddingHorizontal: 10}}
                placeholder='Grip Name'
              />
            </Col>
          </Row>
        </View>
        <ScrollView style={{flex: 1, paddingHorizontal: 5}}>
          {
            sets.map((set, idx) => (
              <GripDetailCard key={idx}>
                <Title> Set { idx + 1} </Title>
                <SetDetailsView>
                <NumericInput label='reps' />
                <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 18}}> X </Text>
                <NumericInput label='lbs' />
                </SetDetailsView>
              </GripDetailCard>
            ))
          }
          
        </ScrollView>
        <View style={{flex: 0}}>
            <TouchableOpacity activeOpacity={0.5} onPress={this.addSet}>
            <View style={{ height: 40, alignContent: 'center', justifyContent: 'center', backgroundColor: '#FE5F55', alignItems: 'center'}}>
              <Text style={{color: 'white'}}> Add Set </Text>
            </View>
            </TouchableOpacity>
          </View>
      </View>
    )
  }
}
