import React from 'react'
import { StyleSheet, View, ScrollView, Text } from 'react-native'
import { CarTicket } from './CarTicket'
import { NoVehiclesMessage } from './NoVehiclesMessage'

export const HistoryScreenContent = props => {
  const getTotalCharged = () => {
    const prices = props.shownHistoryVehicles.map(
      // Times 100 here is to avoid JS inprecision of floating numbers.
      vehicle => vehicle.priceNum * 100
    )
    const pricesSum = prices.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    )
    const formatedPrice = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(pricesSum / 100)
    return formatedPrice
  }

  return (
    <View style={styles.wrapper}>
      {props.noVehicles && (
        <NoVehiclesMessage message={'There are no vehicles in the history.'} />
      )}
      {props.noVehiclesToday && (
        <NoVehiclesMessage
          message={"There are no vehicles in today's history."}
        />
      )}
      <ScrollView>
        {!props.noVehiclesToday && (
          <Text style={styles.totalCharged}>
            Total charged: {getTotalCharged()}
          </Text>
        )}

        {props.shownHistoryVehicles.map(item => (
          <CarTicket {...item} key={item.id} />
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  noVehiclesMessage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: '#000807',
    fontSize: 18
  },
  totalCharged: {
    marginTop: 8,
    marginLeft: 16,
    fontSize: 18
  }
})
