
import { storiesOf } from "@storybook/react-native"
import * as React from "react"
import { View, Text} from 'react-native';
import Card from '../commonComponents/Card';
import './FloatingInputStory';

storiesOf('Story')
  .add('Card', () => 
  <View>
   <Card cardTitle={'Card Title'} content={() => <Text> I am content </Text>} />
  </View>
)
