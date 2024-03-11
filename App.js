import { StatusBar } from 'expo-status-bar'
import { StyleSheet, SafeAreaView } from 'react-native'
import { StateProvider } from './src/context/StateContext'
import { Tabs } from './src/Tabs'

export default function App() {
  return (
    <StateProvider>
      <SafeAreaView style={styles.container}>
        <Tabs />
        <StatusBar style="auto" />
      </SafeAreaView>
    </StateProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
