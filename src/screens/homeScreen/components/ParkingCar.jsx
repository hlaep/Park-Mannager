import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { ParkingCarActions } from './ParkingCarActions'

export const ParkingCar = props => (
  <View style={styles.wrapper}>
    <View style={styles.info}>
      <Text style={[styles.text]}>{props.name}</Text>
      <Text style={[styles.text, styles.sign]}>{props.sign}</Text>
    </View>
    <View style={styles.info}>
      <Text style={[styles.text]}>{props.type}</Text>
    </View>
    <View style={styles.info}>
      <ParkingCarActions
        createdAt={props.createdAt}
        type={props.type}
        id={props.id}
      />
    </View>
  </View>
)

const styles = StyleSheet.create({
  wrapper: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    paddingVertical: 16,
    height: 100,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  text: {
    fontSize: 16,
    color: 'black',
    textTransform: 'capitalize'
  },
  info: {
    flex: 1,
    flexBasis: '33%',
    justifyContent: 'space-between'
  },
  sign: {
    textTransform: 'uppercase'
  }
})
