import * as React from 'react';
import { Button, Icon } from 'native-base';

const EditRepeaterButton = ({ navigation }: any) =>
  <Button onPress={() => {navigation.navigate('EditRepeater')}} transparent>
    <Icon style={{color: 'white'}} name='md-create' />
  </Button>;

export default EditRepeaterButton;
