import * as React from 'react';
import {
  View,
  TextInput,
  Text,
  Animated,
} from 'react-native';

export interface OwnProps {
  value: string;
  onChange: React.EventHandler<React.ChangeEvent<TextInput>>;
  label: string;
}

export interface State {
  isFocused: boolean;
}
export default class FloatingLabelInput extends React.PureComponent<OwnProps, State> {
  labelAnimation: Animated.Value;
  
  constructor(props: OwnProps) {
    super(props);
    this.state = {
      isFocused: false,
    }
  }

  componentWillMount() {
    this.labelAnimation = this.props.value === '' ? new Animated.Value(0) : new Animated.Value(1);
  }
  componentDidUpdate() {
    if (!this.labelAnimation) {
      return;
    }
    Animated.timing(
      this.labelAnimation,
      { toValue: (this.state.isFocused || this.props.value !== '') ? 1 : 0, duration: 200 },
    ).start()
  }
  handleFocus = () => this.setState({ isFocused: true })
  handleBlur = () => this.setState({ isFocused: false })

  render() {
    const { label, ...props } = this.props;
    const { isFocused } = this.state;
    const labelStyle = {
      position: 'absolute',
      left: 0,
      top: this.labelAnimation.interpolate({
        inputRange: [0,1],
        outputRange: [18, 0]
      }),
      // fontSize: !isFocused ? 20 : 14,
      fontSize: this.labelAnimation.interpolate({
        inputRange: [0,1],
        outputRange: [20, 15]
      }),
    };
    return (
      <View style={{ paddingTop: 18 }}>
        <Animated.Text style={labelStyle}>
          {label}
        </Animated.Text>
        <TextInput
          {...props}
          style={{ height: 26, fontSize: 20, color: '#000', borderBottomWidth: 1, borderBottomColor: '#555' }}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          blurOnSubmit
        />
      </View>
    );
  }
}
