import React from 'react'
import {StyleSheet, Text} from 'react-native'

const styles = StyleSheet.create({
  wrapper: {
    fontSize: 20,
    marginTop: 6,
  },
  charge: {
    color: '#45F0DF',
  },
})

export const ChargeCardStat = props => {
  const formatedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(props.charge)

  return (
    <Text style={styles.wrapper}>
      Cobrando <Text style={styles.charge}>{formatedPrice}</Text>
      {props.endText}
    </Text>
  )
}
