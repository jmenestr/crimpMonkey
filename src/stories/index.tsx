
import { storiesOf } from "@storybook/react-native"
import * as React from "react"
import SortableList from '../commonComponents/SortableList';
import { View } from 'react-native';

storiesOf('Story')
  .add('This is a list', () => 
  <View>
   <SortableList />
  </View>
)
