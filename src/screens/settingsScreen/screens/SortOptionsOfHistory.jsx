import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'

export const SortOptionsOfHistory = () => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.option}>Day</Text>
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
    fontSize: 22,
    padding: 8,
    borderBottomWidth: 1,
    borderColor: '#000807'
  }
})
