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
import {
  getDateBeforeOrAfterDate,
  getTicketsOfDate,
  getDateName
} from '../dateLogics'

export const HistoryScreen = () => {
  const { cars } = useContext(StateContext)
  const historyVehicles = cars.filter(car => !car.parking)
  const [shownHistoryVehicles, setShownHistoryVehicles] = useState([])
  const [currentDate, setCurrentDate] = useState(new Date())

  useEffect(() => {
    //Update the UI whenever a new car is added to the database or current date changes
    getVehiclesToShow()
  }, [cars, currentDate])

  const getVehiclesToShow = () => {
    const currentDateTickets = getTicketsOfDate(currentDate, historyVehicles)

    setShownHistoryVehicles(currentDateTickets)
  }

  const changeDate = direction => {
    const isOlder = direction === 'older' ? true : false
    const olderOrNewerDate = getDateBeforeOrAfterDate(
      currentDate,
      historyVehicles.map(vehicle => vehicle.exitTime),
      isOlder
    )
    if (olderOrNewerDate) setCurrentDate(olderOrNewerDate)
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => changeDate('older')}>
          <Image
            source={require('../img/arrow-pointing-right.png')}
            style={styles.img}
          />
        </TouchableOpacity>
        <Text style={styles.headerTxt}>{getDateName(currentDate)}</Text>
        <TouchableOpacity onPress={() => changeDate('newer')}>
          <Image
            source={require('../img/arrow-pointing-left.png')}
            style={styles.img}
          />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.mainList}>
        {shownHistoryVehicles.map(item => (
          <CarOfHistory {...item} key={item.id} />
        ))}
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
