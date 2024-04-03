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
  //jooj
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
      {historyVehicles.length < 1 && (
        <View style={styles.center}>
          <Text style={styles.txt}>Não há nenhum veículo no histórico.</Text>
        </View>
      )}

      {shownHistoryVehicles.length < 1 && historyVehicles.length >= 1 && (
        <View style={styles.center}>
          <Text style={styles.txt}>
            Não há nenhum veículo no histórico de hoje.
          </Text>
          <TouchableOpacity style={styles.btn} onPress={() => handleShowMore()}>
            <Text style={styles.btnTxt}>Mostrar mais...</Text>
          </TouchableOpacity>
        </View>
      )}
      {shownHistoryVehicles?.length >= 1 && (
        <ScrollView style={styles.scrollView}>
          {shownHistoryVehicles.map(item => (
            <CarOfHistory {...item} key={item.id} />
          ))}
          <View style={styles.center}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => handleShowMore()}
            >
              <Text style={styles.btnTxt}>Mostrar mais...</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#B3B7EE'
  },
  scrollView: {
    paddingHorizontal: 16
  },
  centerTitle: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'black'
  },
  title: {
    color: '#000807',
    fontSize: 35,
    fontWeight: 'bold'
  },
  txt: {
    color: '#000807',
    fontSize: 18
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btn: {
    marginTop: 16,
    padding: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 6
  },
  btnTxt: {
    color: '#000807',
    fontSize: 16
  }
})
