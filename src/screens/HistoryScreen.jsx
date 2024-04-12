import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import { StateContext } from '../context/StateContext'
import {
  getDateBeforeOrAfterDate,
  getTicketsOfDate,
  getDateName
} from '../dateLogics'
import { HistoryScreenContent } from '../components/HistoryScreenContent'
import { HistoryScreenHeader } from '../components/HistoryScreenHeader'

export const HistoryScreen = () => {
  const { cars } = useContext(StateContext)
  const historyVehicles = cars.filter(car => !car.parking)
  const [shownHistoryVehicles, setShownHistoryVehicles] = useState([])
  const [currentDate, setCurrentDate] = useState(new Date())

  useEffect(() => {
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
      <HistoryScreenHeader
        changeDate={changeDate}
        dateName={() => getDateName(currentDate)}
      />
      <HistoryScreenContent
        noVehicles={historyVehicles.length < 1}
        noVehiclesToday={
          shownHistoryVehicles.length < 1 && historyVehicles.length >= 1
        }
        shownHistoryVehicles={shownHistoryVehicles}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#B3B7EE'
  }
})
