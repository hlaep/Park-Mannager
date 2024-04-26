import React, { useContext } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { clearHistory } from '../db/parkingCarsDb'
import { StateContext } from '../context/StateContext'
import { ScrollView } from 'react-native-web'

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
        <View style={styles.option}>
          <Text style={styles.optionLabel}>Clear history</Text>
          <TouchableOpacity
            onPress={() => handleClearHistory()}
            style={styles.btn}
          >
            <Text style={styles.buttonTxt}>Clear</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#B3B7EE',
    paddingHorizontal: 8
  },
  option: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: 'black',
    borderBottomWidth: 1
  },
  optionLabel: {
    fontSize: 16
  },
  btn: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#000807'
  },
  buttonTxt: {
    fontSize: 16,
    color: '#B3B7EE'
  }
})
