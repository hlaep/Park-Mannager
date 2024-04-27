import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'

export const ToggleOption = () => {
  const [toggle, setToggle] = useState(false)

  useEffect(() => {}, [toggle])

  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>Sort history by:</Text>
      <TouchableOpacity style={styles.toggle} onPress={() => setToggle(true)}>
        <Text>Day</Text>
        <Image
          style={styles.img}
          source={require('../img/arrow-pointing-down.png')}
        />
      </TouchableOpacity>
      <View style={styles.options}>
        <Text style={styles.option}>Day</Text>
        <Text style={styles.option}>Week</Text>
        <Text style={styles.option}>Month</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: 'black',
    borderBottomWidth: 1
  },
  text: {
    fontSize: 16
  },
  toggle: {
    flexDirection: 'row',
    borderRadius: 8,
    backgroundColor: '#648DE5',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    width: 120
  },
  img: {
    width: 30,
    height: 30
  },
  options: {
    backgroundColor: '#648DE5',
    padding: 8,
    borderRadius: 8
  },
  option: {
    borderBottomWidth: 1
  }
})
