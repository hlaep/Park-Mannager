import React, { useState, useEffect, useContext } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import { StateContext } from '../context/StateContext'
import { CarOfHistory } from '../components/CarOfHistory'
import { clearHistory } from '../db/parkingCarsDb'
import {
  getFullDate,
  checkDuplicate,
  checkDuplicateDate,
  getDatesToShow
} from '../logics'

export const HistoryScreen = () => {
  const { cars } = useContext(StateContext)
  const historyVehicles = cars.filter(car => !car.parking)
  const [shownHistoryVehicles, setShownHistoryVehicles] = useState([])
  const [searchDepth, setSearchDepth] = useState(0)

  useEffect(() => {
    //Update the UI whenever a new car is added to the database
    getVehiclesToShow(searchDepth)
    console.log('updatedHistoryCars')
  }, [cars])

  const getVehiclesToShow = searchIndex => {
    const dates = getDatesToShow(
      searchIndex,
      historyVehicles.map(obj => obj.exitTime)
    )

    const vehiclesToShow = []

    historyVehicles.forEach(vehicle => {
      if (checkDuplicateDate(vehicle.exitTime, dates)) {
        vehiclesToShow.push(vehicle)
      }
    })
    setShownHistoryVehicles(vehiclesToShow)
  }

  const handleShowMore = () => {
    // Update the UI by calling getVehiclesToShow, that changes shownVehicleTypes state.
    setSearchDepth(prevState => {
      const updatedDepth = prevState + 1
      getVehiclesToShow(updatedDepth)
      return updatedDepth
    })
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => moveToOlderDate()}>
          <Image source={require('../img/arrow-pointing-left.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => moveToNewerDate()}>
          <Image source={require('../img/arrow-pointing-left.png')} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#B3B7EE'
  },
  header: {
    backgroundColor: '#000807',
    width: '100%'
  }
})
