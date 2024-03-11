import React, {useState, useEffect, useContext} from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import {StateContext} from '../context/StateContext'
import {CarOfHistory} from '../components/CarOfHistory'
import {clearHistory} from '../db/parkingCarsDb'

export const HistoryScreen = () => {
  const {cars} = useContext(StateContext)
  const [displayCars, setDisplayCars] = useState([])
  const datesToDisplay = [new Date()]
  const tickets = cars
    .filter(car => car.parking === false)
    .sort((a, b) => b.exitTime - a.exitTime)

  const getFullDate = time => {
    let date = time
    if (typeof time === 'number') date = new Date(time)
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
    return date.toLocaleDateString(undefined, options)
  }

  const datesToAdd = shownDates => {
    const datesOfTickets = tickets.map(ticket => getFullDate(ticket.exitTime))
    const datesWithTickets = Array.from(new Set(datesOfTickets))
    const queueOfDatesToAdd = datesWithTickets.filter(date => {
      return !shownDates.find(shownDate => getFullDate(shownDate) === date)
    })
    return queueOfDatesToAdd
  }

  useEffect(() => {
    const carsNDateTitles = getCarsWithDateTitles()
    if (carsNDateTitles) setDisplayCars(carsNDateTitles)
  }, [cars])

  const getYesterdayOfDate = date => {
    const currentTimestamp = date.getTime()
    const oneDayMilliseconds = 24 * 60 * 60 * 1000
    const dayBeforeTimestamp = currentTimestamp - oneDayMilliseconds
    return new Date(dayBeforeTimestamp)
  }

  const getTicketsOfDate = (inputDate, tickets) => {
    const ticketsOfDate = []

    tickets.forEach(ticket => {
      const exitDate = new Date(ticket.exitTime)
      if (
        exitDate.getDate() === inputDate.getDate() &&
        exitDate.getMonth() === inputDate.getMonth() &&
        exitDate.getFullYear() === inputDate.getFullYear()
      ) {
        ticketsOfDate.push(ticket)
      }
    })

    return ticketsOfDate
  }

  const getCarsWithDateTitles = () => {
    if (tickets < 1) return
    const toDisplay = []

    const pushTitleNtickets = (title, date) => {
      const dateTickets = getTicketsOfDate(date, tickets)
      if (dateTickets.length < 1) {
        return null
      } else {
        toDisplay.push(
          <View key={title} style={styles.centerTitle}>
            <Text style={styles.title}>{title}</Text>
          </View>,
        )
        getTicketsOfDate(date, tickets).forEach(ticket =>
          toDisplay.push(<CarOfHistory key={ticket.id} {...ticket} />),
        )
      }
    }

    datesToDisplay.forEach(date => {
      switch (getFullDate(date)) {
        case getFullDate(new Date()):
          pushTitleNtickets('Hoje', date)
          break
        case getFullDate(getYesterdayOfDate(new Date())):
          pushTitleNtickets('Ontem', date)
          break
        default:
          pushTitleNtickets(date.toLocaleString('pt-BR').split(' ')[0], date)
      }
    })

    return toDisplay
  }

  const handleShowMore = () => {
    const datesWithTickets = datesToAdd(datesToDisplay)
    console.log(datesWithTickets)
    console.log(getFullDate(tickets[0].exitTime))
  }
  return (
    <View style={styles.wrapper}>
      {tickets.length < 1 && (
        <View style={styles.center}>
          <Text style={styles.txt}>Não há nenhum veículo no histórico.</Text>
        </View>
      )}

      {displayCars?.length < 1 && tickets.length >= 1 && (
        <View style={styles.center}>
          <Text style={styles.txt}>
            Não há nenhum veículo no histórico de hoje.
          </Text>
          <TouchableOpacity style={styles.btn} onPress={() => handleShowMore()}>
            <Text style={styles.btnTxt}>Mostrar mais...</Text>
          </TouchableOpacity>
        </View>
      )}
      {displayCars?.length >= 1 && (
        <ScrollView style={styles.scrollView}>
          {displayCars.map(item => item)}
          <View style={styles.center}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => handleShowMore()}>
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
    paddingLeft: 16,
    paddingVertical: 6,
    backgroundColor: '#B3B7EE',
  },
  scrollView: {
    paddingRight: 16,
  },
  centerTitle: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  title: {
    color: '#000807',
    fontSize: 35,
    fontWeight: 'bold',
  },
  txt: {
    color: '#000807',
    fontSize: 18,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    marginTop: 16,
    padding: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 6,
  },
  btnTxt: {
    color: '#000807',
    fontSize: 16,
  },
})
