import * as React from "react"
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Button,
} from 'react-native'

import * as ReactNavigation from 'react-navigation'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#A2C523'
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  title: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttons: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  }
})
interface Props {
  name?: string,
  navigation: ReactNavigation.NavigationScreenProp<void, void>
}
class Home extends React.PureComponent<Props, void> {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.title} >
          <Text style={styles.titleText} > Crimp Monkey </Text>
        </View>
        <View style={styles.buttons}>
          <Button title={'Button'} onPress={() => this.props.navigation.navigate('Workout')} >
          </Button>
          <Text style={{ color: 'white'}}> Main Page </Text>
        </View>
      </View>
    )
  }
}

class Workouts extends React.PureComponent<Props, void> {
    render() {
    return (
      <View style={styles.container}>
        <View style={styles.title} >
          <Text style={styles.titleText} > Crimp Monkey </Text>
        </View>
        <View style={styles.buttons}>
                    <Button title={'Button'} onPress={() => this.props.navigation.navigate('Index')} >
          </Button>
          <Text style={{ color: 'white'}}> Workout Page </Text>
        </View>
      </View>
    )
  }
}

const App = ReactNavigation.StackNavigator(
  {
    Index: {
      screen: Home
    },
    Workout: {
      screen: Workouts
    }
  },
  {
    initialRouteName: 'Index',
    headerMode: 'none',
    // mode: Platform.OS === 'ios' ? 'modal' : 'card',
  }
)
export default App
