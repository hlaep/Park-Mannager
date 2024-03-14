import React, { useState, useRef, useEffect, useContext } from 'react'
import {
  StyleSheet,
  Animated,
  View,
  Image,
  TouchableHighlight,
  TextInput
} from 'react-native'
import { StateContext } from '../context/StateContext'
import { addNewType } from '../db/vehicleTypesDb'

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#000807',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    marginBottom: 8
  },
  buttonContainer: {
    justifyContent: 'center'
  },
  img: {
    height: 60,
    width: 60
  },
  input: {
    position: 'absolute',
    left: 76,
    fontSize: 20,
    color: 'white'
  }
})

export const AddNewVehicleTypeButton = props => {
  const [isToggled, setIsToggled] = useState(false)
  const [newType, setNewType] = useState('')
  const { updateVehicleTypes, displayError } = useContext(StateContext)
  const translateX = useRef(new Animated.Value(0)).current
  const inputRef = useRef(null)

  useEffect(() => {
    if (isToggled) {
      Animated.timing(translateX, {
        toValue: -130,
        duration: 250,
        useNativeDriver: true
      }).start()
      inputRef.current.focus()
    } else {
      Animated.timing(translateX, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true
      }).start()
    }
  }, [isToggled])

  const handleSubmit = async () => {
    if (!isToggled) return
    if (newType === '') {
      displayError('O nome do tipo novo de veículo não pode estar vazio')
      return
    }

    try {
      await addNewType(newType)
      setIsToggled(false)
      setNewType('')
      updateVehicleTypes()
    } catch (e) {
      console.error(
        'Error when trying to add new vehicle type at handleSubmit at addNewVehicleTypeButton: ',
        e
      )
    }
  }

  return (
    <View style={styles.wrapper}>
      <Animated.View
        style={[styles.buttonContainer, { transform: [{ translateX }] }]}
      >
        <TouchableHighlight
          onPress={() => setIsToggled(!isToggled)}
          underlayColor="#000807"
        >
          <Image
            source={require('../img/add-focused.png')}
            style={styles.img}
          />
        </TouchableHighlight>
        <TextInput
          ref={inputRef}
          style={[styles.input, { display: isToggled ? 'flex' : 'none' }]}
          selectionColor="white"
          keyboardType="visible-password"
          onSubmitEditing={() => handleSubmit()}
          value={newType}
          onChangeText={setNewType}
        />
      </Animated.View>
    </View>
  )
}
