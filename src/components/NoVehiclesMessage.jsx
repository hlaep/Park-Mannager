import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export const NoVehiclesMessage = props => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>{props.message}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: '#000807',
    fontSize: 18
  }
})
