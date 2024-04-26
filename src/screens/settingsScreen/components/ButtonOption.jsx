import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'

export const ButtonOption = props => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>Clear history</Text>
      <TouchableOpacity
        onPress={() => props.handleClearHistory()}
        style={styles.btn}
      >
        <Text style={styles.buttonTxt}>Clear</Text>
      </TouchableOpacity>
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
