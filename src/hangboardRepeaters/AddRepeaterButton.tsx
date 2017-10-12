import * as React from 'react';
import { Button, Icon } from 'native-base';
import { setNewWorkout } from '../models/workoutModel';
import { connect } from 'react-redux';

interface MappedDispatch {
  setNewWorkout: () => void;
}

interface OwnProps {
  navigation: any;
}

export type Props = MappedDispatch & OwnProps
class AddRepeaterButtonComponent extends React.PureComponent<Props, {}> {
  onClick = () => {
    this.props.setNewWorkout();
    this.props.navigation.navigate('EditRepeater');
  }

render() {
  return (
    <Button onPress={this.onClick} transparent>
      <Icon style={{color: 'white'}} name='md-add' />
    </Button>
  )
}
}
  
const mapDispatchToProps = (dispatch: any): MappedDispatch => ({
  setNewWorkout: () => dispatch(setNewWorkout({}))
})

const AddRepeaterButton = connect(() => ({}), mapDispatchToProps)(AddRepeaterButtonComponent);
export default AddRepeaterButton;
