import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'

export const ToggleOption = () => {
  const navigation = useNavigation()
  const showOptions = () => {
    navigation.navigate('Choose an option for soting the history')
  }
  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>Sort history by:</Text>
      <TouchableOpacity style={styles.toggle} onPress={() => showOptions()}>
        <Text>Day</Text>
        <Image
          style={styles.img}
          source={require('../img/arrow-pointing-down.png')}
        />
      </TouchableOpacity>
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
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    width: 120
  },
  img: {
    width: 30,
    height: 30
  }
})
