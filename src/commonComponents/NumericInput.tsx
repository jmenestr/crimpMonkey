import * as React from 'react';
import {
  View,
  TextInput,
  Text
} from 'react-native';

export interface Props {
  value?: number
  label: string;
  onChange: (e: any) => void
}

export interface State {
  isFocused: boolean;
}

export default class NumericInput extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isFocused: false
    }
  }

  focus = () => this.setState({ isFocused: true })
  unfocus = () => this.setState({ isFocused: false })

  render() {
    const {
      label,
      onChange,
      value = 0,
    } = this.props;

    return (
      <View style={{width: 50, height: 50}} >
        <TextInput
          defaultValue='0'
          keyboardType='numeric'
          onChange={onChange}
          onFocus={this.focus}
          onBlur={this.unfocus}
          value={value.toString()}
          style={{
            borderBottomColor: '#274060',
            borderBottomWidth: 2,
            textAlign: 'center',
          }}
         />
         <View style={{flex: 1, alignItems: 'center' }}>
          <Text> { label } </Text>
         </View>
      </View>
    )
  }
}
