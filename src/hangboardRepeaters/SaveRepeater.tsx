import * as React from 'react';
import { Button, Icon } from 'native-base';
import { Dispatch, connect } from 'react-redux';
import { saveWorkoutAction } from '../models/workoutModel';
import SaveRepeaterButton from './SaveRepeater';

interface OwnProps {
  navigation: any
}

interface MappedDispatch {
  saveRepeater: () => void
}

export type Props = OwnProps & MappedDispatch
class SaveRepeaterButtonComponent extends React.PureComponent<Props, {}> {

  saveRepeater = () => {
    this.props.saveRepeater()
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
  saveRepeater: () => dispatch(saveWorkoutAction({})),
})

const SaveRepeaterButton = connect(
  () => ({}),
  mapDispatchToProps,
)(SaveRepeaterButtonComponent);
export default SaveRepeaterButton;
