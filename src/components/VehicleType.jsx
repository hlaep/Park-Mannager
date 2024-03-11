import React from 'react'
import {Text, TouchableHighlight, StyleSheet} from 'react-native'

const styles = StyleSheet.create({
  selected: {
    backgroundColor: '#000807',
    borderColor: '#000807',
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
  },
  unselected: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
  },
  selectedTxt: {
    color: '#B3B7EE',
    textTransform: 'capitalize',
    fontSize: 16,
  },
  unselectedTxt: {
    color: '#000807',
    textTransform: 'capitalize',
    fontSize: 16,
  },
})

export const VehicleType = props => {
  return (
    <TouchableHighlight
      underlayColor="transparent"
      onPress={() => props.selectType(props.name)}
      style={props.isSelected ? styles.selected : styles.unselected}>
      <Text
        style={props.isSelected ? styles.selectedTxt : styles.unselectedTxt}>
        {props.name}
      </Text>
    </TouchableHighlight>
  )
}
