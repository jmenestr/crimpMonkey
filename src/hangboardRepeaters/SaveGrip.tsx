import * as React from 'react';
import { Button, Icon } from 'native-base';
import { Dispatch, connect } from 'react-redux';
import { saveWorkoutAction, saveGripAction } from '../models/workoutModel';

interface OwnProps {
  navigation: any
}

interface MappedDispatch {
  saveGrip: () => void
}

export type Props = OwnProps & MappedDispatch
class SaveGripButtonComponent extends React.PureComponent<Props, {}> {

  saveRepeater = () => {
    this.props.saveGrip()
    this.props.navigation.goBack()
  }
  render() {
    const {
      navigation
    } = this.props
    return (
      <Button onPress={this.saveRepeater} transparent>
        <Icon style={{color: 'white'}} name='md-checkmark' />
      </Button>
    )
  }
}

const mapDispatchToProps = (dispatch: Dispatch<any>): MappedDispatch => ({
  saveGrip: () => dispatch(saveGripAction({})),
})

const SaveGripButton = connect(
  () => ({}),
  mapDispatchToProps,
)(SaveGripButtonComponent);
export default SaveGripButton;
