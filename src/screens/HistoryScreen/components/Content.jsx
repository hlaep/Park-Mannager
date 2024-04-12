import React from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { CarTicket } from './CarTicket'
import { NoVehiclesMessage } from './NoVehiclesMessage'

export const HistoryScreenContent = props => {
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
  }
})