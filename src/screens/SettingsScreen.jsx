import React, { useContext } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { clearHistory } from '../db/parkingCarsDb'
import { StateContext } from '../context/StateContext'

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
      <View style={styles.option}>
        <Text>Limpar histórico</Text>
        <TouchableOpacity onPress={() => handleClearHistory()}>
          <Text>Limpar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#B3B7EE'
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})
