import React from 'react'
import {Text, StyleSheet, TouchableOpacity} from 'react-native'
import {useNavigation} from '@react-navigation/native'

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#000807',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    marginBottom: 8,
  },
  text: {
    fontSize: 22,
    textTransform: 'capitalize'
  },
})

export const VehicleTypeButton = props => {
  const navigation = useNavigation()
  const navigate = () => {
    navigation.navigate(props.name, props.type)
  }
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.wrapper}
      onPress={() => navigate()}>
      <Text style={styles.text}>{props.name}</Text>
    </TouchableOpacity>
  )
}
