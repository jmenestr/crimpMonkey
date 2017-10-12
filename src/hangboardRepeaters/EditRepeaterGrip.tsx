import * as React from 'react';
import { Row, Col } from 'native-base';
import styled from 'styled-components/native';
import NumericInput from '../commonComponents/NumericInput';
import { WorkoutState, Grip, getEditableGrip, updateGripNameAction, addGripSet } from '../models/workoutModel';
import { connect, Dispatch } from 'react-redux';
import SaveGripButton from './SaveGrip';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native'


interface OwnProps {
  navigation: any
}

interface MappedProps {
  grip: Grip
}

interface MappedDispatch {
  updateGripName: (name: string) => void
  addGripSet: () => void
}
export type Props = OwnProps & MappedProps & MappedDispatch
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
class EditRepeaterGripComponent extends React.PureComponent<Props, {}> {
  static navigationOptions = ({ navigation }: any) => ({
    headerRight: <SaveGripButton navigation={navigation} />,
    headerStyle: {
      backgroundColor: '#274060',
    },
    headerBackTitleStyle: {
      color: 'white'
    },
    headerTintColor: 'white'
  })
  
  updateName = (e: any) => {
    const newName = e.nativeEvent.text;
    this.props.updateGripName(newName)
  }
  render() {
    const {
      grip,
      addGripSet,
    } = this.props
    return (
      <View style={{flex: 1}}>
        <View style={{height: 30, marginBottom: 5, backgroundColor: '#BDD5EA'}}>
          <Row>
            <Col>
              <TextInput
                style={{height: 30, borderColor: '#1B2845', borderBottomWidth: 1, paddingHorizontal: 10}}
                value={grip.name}
                onChange={this.updateName}
                placeholder='Grip Name'
              />
            </Col>
          </Row>
        </View>
        <ScrollView style={{flex: 1, paddingHorizontal: 5}}>
          {
            grip.sets.map((set, idx) => (
              <GripDetailCard key={idx}>
                <Title> Set { idx + 1} </Title>
                <SetDetailsView>
                <NumericInput value={set.reps} label='reps' />
                <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 18}}> X </Text>
                <NumericInput value={set.goalWeight} label='lbs' />
                </SetDetailsView>
              </GripDetailCard>
            ))
          }
          
        </ScrollView>
        <View style={{flex: 0}}>
            <TouchableOpacity activeOpacity={0.5} onPress={addGripSet}>
            <View style={{ height: 40, alignContent: 'center', justifyContent: 'center', backgroundColor: '#FE5F55', alignItems: 'center'}}>
              <Text style={{color: 'white'}}> Add Set </Text>
            </View>
            </TouchableOpacity>
          </View>
      </View>
    )
  }
}

const mapStateToProps = (state: WorkoutState): MappedProps => ({
  grip: getEditableGrip(state),
})

const mapDispatchToProps = (dispatch: Dispatch<WorkoutState>): MappedDispatch => ({
  updateGripName: (name: string) => dispatch(updateGripNameAction({ name })),
  addGripSet: () => dispatch(addGripSet({}),
});

const EditRepeaterGrip = connect(mapStateToProps, mapDispatchToProps)(EditRepeaterGripComponent);
export default EditRepeaterGrip;
