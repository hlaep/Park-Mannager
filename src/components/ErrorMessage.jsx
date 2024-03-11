import React, {useEffect, useRef, useContext} from 'react'
import {StyleSheet, Text, Animated} from 'react-native'
import { StateContext } from '../context/StateContext'

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    backgroundColor: '#E27373',
    color: 'black',
    padding: 16,
    width: '100%',
  },
})

export const ErrorMessage = ({message}) => {
  const translateY = useRef(new Animated.Value(-60)).current
  const {showError, setShowError} = useContext(StateContext)

  useEffect(() => {
    if (showError) {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start()
      setTimeout(() => {
        Animated.timing(translateY, {
          toValue: -60,
          duration: 250,
          useNativeDriver: true,
        }).start()
      }, 3000)
        setTimeout(() => setShowError(false), 3500)
    }
  }, [])

  return (
    <Animated.View style={[styles.wrapper, {transform: [{translateY}]}]}>
      <Text>{message}</Text>
    </Animated.View>
  )
}
