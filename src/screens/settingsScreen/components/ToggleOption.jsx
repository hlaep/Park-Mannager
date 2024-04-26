import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

export const ToggleOption = () => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>Sort history by:</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: 'black',
    borderBottomWidth: 1
  },
  text: {
    fontSize: 16
  }
})
