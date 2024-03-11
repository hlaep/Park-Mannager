import React from 'react'
import {StyleSheet, Text, View} from 'react-native'

const styles = StyleSheet.create({
  wrapper: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    paddingVertical: 16,
    flex: 1,
  },
  txt: {
    fontSize: 16,
    color: 'black',
    textTransform: 'capitalize',
  },
  info: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sign: {
    textTransform: 'uppercase',
  },
})

export const CarOfHistory = props => {
  return (
    <View style={styles.wrapper}>
      <Info name={'Nome:'} value={props.name} />
      <Info name={'Placa:'} value={props.sign} />
      <Info name={'Veículo:'} value={props.type} />
      <Info name={'Tempo estacionado:'} value={props.time} />
      <Info name={'Preço cobrado:'} value={props.price} />
      <Info
        name={'Entrada:'}
        value={new Date(props.createdAt).toLocaleString('pt-BR')}
      />
      <Info
        name={'Saída:'}
        value={new Date(props.exitTime).toLocaleString('pt-BR')}
      />
    </View>
  )
}

const Info = props => (
  <View style={styles.info}>
    <Text style={styles.txt}>{props.name}</Text>
    <Text style={styles.txt}>{props.value}</Text>
  </View>
)
