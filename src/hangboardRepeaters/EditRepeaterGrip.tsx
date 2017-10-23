import * as React from 'react';
import { Row, Col } from 'native-base';
import styled from 'styled-components/native';
import NumericInput from '../commonComponents/NumericInput';
import { WorkoutState, Grip, getEditableGrip, updateGripNameAction, addGripSet, updateSetReps, updateSetWeight } from '../models/workoutModel';
import { connect, Dispatch } from 'react-redux';
import SaveGripButton from './SaveGrip';
import FloatingLabelInput from '../commonComponents/Input';
import Title from '../commonComponents/Title';
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
  updateReps: (index: number, repCount: number) => void
  updateWeight: (index: number, weight: number) => void
}
export type Props = OwnProps & MappedProps & MappedDispatch
const GripDetailCard = styled.View`
backgroundColor: #1B2845;
marginTop: 5;
marginBottom: 5;
`;

// const Title = styled.Text`
// color: white;
// fontSize: 18;
// paddingTop: 5;
// paddingBottom: 5;
// fontWeight: 900;
// `;

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
    headerTitle: <Title title='Edit Grip' />,
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

  updateRepCount = (value: string, index: number) => {
    const newRepCount = parseInt(value);
    const parsedReps = isNaN(newRepCount) ? 0 : newRepCount;    
    this.props.updateReps(index, parsedReps);
  }

  updateWeight = (value: string, index: number) => {
    const newWeight = parseInt(value);
    const parsedRepCount = isNaN(newWeight) ? 0 : newWeight;    
    this.props.updateWeight(index, parsedRepCount);
  }
  render() {
    const {
      grip,
      addGripSet,
    } = this.props
    return (
      <View style={{flex: 1}}>
        <View style={{paddingLeft: 5, paddingRight: 5, marginBottom: 5, backgroundColor: '#BDD5EA'}}>
          <FloatingLabelInput
            value={grip.name}
            onChange={this.updateName}
            label='Grip Name'
          />
        </View>
        <ScrollView style={{flex: 1, paddingHorizontal: 5}}>
          {
            grip.sets.map((set, idx) => (
              <GripDetailCard key={idx}>
                <Title title={`Set ${idx + 1}`} />
                <SetDetailsView>
                <NumericInput onChange={(e) => this.updateRepCount(e.nativeEvent.text, idx)} value={set.reps} label='reps' />
                <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 18}}> X </Text>
                <NumericInput onChange={e => this.updateWeight(e.nativeEvent.text, idx)}value={set.goalWeight} label='lbs' />
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
  addGripSet: () => dispatch(addGripSet({})),
  updateReps: (index: number, repCount: number) => dispatch(updateSetReps({ index, repCount})),
  updateWeight: (index: number, weight: number) => dispatch(updateSetWeight({ index, weight}))
});

const EditRepeaterGrip = connect(mapStateToProps, mapDispatchToProps)(EditRepeaterGripComponent);
export default EditRepeaterGrip;
