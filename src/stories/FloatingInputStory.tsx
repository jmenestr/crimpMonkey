
import { storiesOf } from "@storybook/react-native"
import * as React from "react"
import { 
  View,
  Text,
} from 'react-native';
import FloatingLabelInput from '../commonComponents/Input';
import { View } from 'react-native';

class FloatingLabelExample extends React.PureComponent<{}, { value: string}> {
  constructor() {
    super();
    this.state = { value: '' }
  }

  setValue = (e: any) => {
    const value = e.nativeEvent.text;
    this.setState(() => ({
      value
    }))
  }

  render() {
    return (
      <View>
        <FloatingLabelInput 
        label='Example Label'
        value={this.state.value}
        onChange={this.setValue}
        />
     </View>
    )
  }
}
storiesOf('Floating Input')
.add('Input', () =>
  <View>
  <FloatingLabelExample />
  <FloatingLabelExample />
  </View>
);
