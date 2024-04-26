import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'

export const HistoryScreenHeader = props => {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={() => props.changeDate('older')}>
        <Image
          source={require('../img/arrow-pointing-right.png')}
          style={styles.img}
        />
      </TouchableOpacity>
      <Text style={styles.text}>{props.dateName()}</Text>
      <TouchableOpacity onPress={() => props.changeDate('newer')}>
        <Image
          source={require('../img/arrow-pointing-left.png')}
          style={styles.img}
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
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
  text: {
    color: '#45F0DF',
    fontSize: 22
  }
})
