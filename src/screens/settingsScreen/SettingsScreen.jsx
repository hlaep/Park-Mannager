import React, { useContext } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import { clearHistory } from '../../db/parkingCarsDb'
import { StateContext } from '../../context/StateContext'
import { ButtonOption } from './components/ButtonOption'
import { ToggleOption } from './components/ToggleOption'

export const SettingsScreen = () => {
  const { displayError, updateCars } = useContext(StateContext)
  const handleClearHistory = async () => {
    try {
      await clearHistory()
      updateCars()
    } catch (e) {
      displayError('error at handleClearHistory')
      console.error(e.message, e)
    }
  }
  return (
    <View style={styles.wrapper}>
      <ScrollView>
        <ButtonOption handleClearHistory={handleClearHistory} />
        <ToggleOption />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#B3B7EE',
    paddingHorizontal: 8
  }
})
