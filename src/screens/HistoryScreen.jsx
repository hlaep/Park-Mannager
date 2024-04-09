import React, { useState, useEffect, useContext } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native'
import { StateContext } from '../context/StateContext'
import { CarOfHistory } from '../components/CarOfHistory'
import { clearHistory } from '../db/parkingCarsDb'
import {
  getFullDate,
  checkDuplicate,
  checkDuplicateDate,
  getTicketsOfDate
} from '../logics'

export const HistoryScreen = () => {
  const { cars } = useContext(StateContext)
  const historyVehicles = cars.filter(car => !car.parking)
  const [shownHistoryVehicles, setShownHistoryVehicles] = useState([])
  const [currentDate, setCurrentDate] = useState(new Date())

  useEffect(() => {
    //Update the UI whenever a new car is added to the database
    getVehiclesToShow()
  }, [cars])

  const getVehiclesToShow = () => {
    const currentDateTickets = getTicketsOfDate(currentDate, historyVehicles)
    setShownHistoryVehicles(currentDateTickets)
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => moveToOlderDate()}>
          <Image
            source={require('../img/arrow-pointing-right.png')}
            style={styles.img}
          />
        </TouchableOpacity>
        <Text style={styles.headerTxt}>Hoje</Text>
        <TouchableOpacity onPress={() => moveToNewerDate()}>
          <Image
            source={require('../img/arrow-pointing-left.png')}
            style={styles.img}
          />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.mainList}>
        {shownHistoryVehicles.map(vehicle => {})}
      </ScrollView>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 10
  },
  img: {
    height: 40,
    width: 40
  },
  headerTxt: {
    color: '#45F0DF',
    fontSize: 22
  }
})
