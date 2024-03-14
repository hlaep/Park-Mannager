import { StatusBar } from 'react-native'
import { StyleSheet, SafeAreaView } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { StateProvider } from './src/context/StateContext'
import { Tabs } from './src/Tabs'

export default function App() {
  return (
    <StateProvider>
      <SafeAreaView style={styles.appWrapper}>
        <NavigationContainer>
          <Tabs />
        </NavigationContainer>
        <StatusBar backgroundColor="#000807" barStyle="#fff" />
      </SafeAreaView>
    </StateProvider>
  )
}

const styles = StyleSheet.create({
  appWrapper: {
    flex: 1
  }
})
