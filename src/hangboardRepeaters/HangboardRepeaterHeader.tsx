import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { Header, Body, Title, Container, Right, Button, Icon } from 'native-base'

const headerStyles = StyleSheet.create({

})
const HangboardRepeaterHeader = () => 
    <Header backgroundColor='red'> 
      <Body>
        <Title>Hangboard Repeater</Title>
      </Body>
      <Right>
        <Button transparent onPress={() => alert('Pressed')}>
        <Text> Add Grip </Text>

          <Icon name='add' />
        </Button>
      </Right>
    </Header>
  // <Header
  //   centerComponent={{ text: 'Hangboard Repeaters', stylereac: { color: 'white' } }} 
  //   rightComponent={{ icon: 'add', color: 'white'}}
  //   backgroundColor='#4CB5F5'
  // />

export default HangboardRepeaterHeader;
