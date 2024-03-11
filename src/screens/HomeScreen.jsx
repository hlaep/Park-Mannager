import React, {useContext, useState, useEffect} from 'react'
import {ScrollView, StyleSheet, Text, View} from 'react-native'
import {ParkingCar} from '../components/ParkingCar'
import {StateContext} from '../context/StateContext'
import {clearTypes} from '../db/vehicleTypesDb'
import {clearParkingCars} from '../db/parkingCarsDb'

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingLeft: 16,
    paddingVertical: 6,
    backgroundColor: '#B3B7EE',
  },
  centerText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#000807',
    fontSize: 18,
  },
  scrollView: {
    paddingRight: 16,
  },
})

export const HomeScreen = () => {
  const {cars, updateCars, updateVehicleTypes} = useContext(StateContext)
  const [parkingCars, setParkingCars] = useState([])

  useEffect(() => {
    updateVehicleTypes()
    updateCars()
  }, [])

  useEffect(() => {
    const onlyParkingCars = cars.filter(car => car.parking === true)
    setParkingCars(onlyParkingCars)
  }, [cars])

  return (
    <View style={styles.wrapper}>
      {parkingCars?.length < 1 && (
        <View style={styles.centerText}>
          <Text style={styles.text}>Não há nenhum veículo estacionado.</Text>
        </View>
      )}
      {parkingCars?.length >= 1 && (
        <ScrollView style={styles.scrollView}>
          {cars.map(car => {
            if (car.parking) return <ParkingCar {...car} key={car.id} />
          })}
        </ScrollView>
      )}
    </View>
  )
}
