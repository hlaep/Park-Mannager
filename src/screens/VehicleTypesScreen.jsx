import React, { useContext, useEffect } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { StateContext } from '../context/StateContext'
import { AddNewVehicleTypeButton } from '../components/AddNewVehicleTypeButton'
import { VehicleTypeButton } from '../components/VehicleTypeButton'

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 8,
    backgroundColor: '#B3B7EE'
  },
  text: {
    color: 'black'
  },
  toggle: {
    backgroundColor: '#000807',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    marginBottom: 8
  },
  toggleText: {
    fontSize: 22
  },
  img: {
    height: 60,
    width: 60
  }
})

export const VehicleTypesScreen = () => {
  const { vehicleTypes, updateVehicleTypes } = useContext(StateContext)

  useEffect(() => {
    updateVehicleTypes()
  }, [])

  return (
    <ScrollView style={styles.wrapper}>
      <AddNewVehicleTypeButton />
      {vehicleTypes['allTypes'].map(type => (
        <VehicleTypeButton
          key={vehicleTypes[type].name}
          name={vehicleTypes[type].name}
          type={vehicleTypes[type]}
        />
      ))}
    </ScrollView>
  )
}
