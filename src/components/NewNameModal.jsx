import React, { useState, useRef, useEffect, useContext } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native'
import { StateContext } from '../context/StateContext'
import { updateTypeName } from '../db/vehicleTypesDb'

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#00000080'
  },
  wrapper: {
    position: 'absolute',
    left: 30,
    right: 30,
    top: 350,
    bottom: 350,
    backgroundColor: '#303038',
    borderRadius: 10
  },
  contentWrapper: {
    flex: 1,
    padding: 16
  },
  topTxt: {
    fontSize: 16,
    color: 'white'
  },
  input: {
    borderRadius: 8,
    borderColor: 'white',
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginVertical: 16,
    color: 'white'
  },
  btnWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
    bottom: 0
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16
  },
  cancelBtn: {
    backgroundColor: '#9A4F4F',
    borderBottomLeftRadius: 10
  },
  submitBtn: {
    backgroundColor: '#45F0DF',
    borderBottomRightRadius: 10
  },
  btnTxt: {
    fontSize: 20,
    color: 'black'
  }
})

export const NewNameModal = props => {
  const [newName, setNewName] = useState('')
  const inputRef = useRef(null)
  const { updateVehicleTypes, displayError } = useContext(StateContext)

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const changeVehicleTypeName = async () => {
    if (newName === '') return displayError('O campo está vazio.')
    try {
      await updateTypeName(props.name, newName)
      updateVehicleTypes()
      props.setShowModal(false)
    } catch (e) {
      displayError('Ocorreu um erro ao tentar mudar o nome do tipo de veículo')
    }
  }
  const cancelProcess = () => {
    props.setShowModal(false)
  }
  return (
    <View style={styles.background}>
      <View style={styles.wrapper}>
        <View style={styles.contentWrapper}>
          <Text style={styles.topTxt}>
            Digite o novo nome desta categoria de veículo.
          </Text>
          <TextInput
            ref={inputRef}
            value={newName}
            onChangeText={setNewName}
            style={styles.input}
            onSubmitEditing={() => changeVehicleTypeName()}
          />
        </View>

        <View style={styles.btnWrapper}>
          <TouchableOpacity
            style={[styles.btn, styles.cancelBtn]}
            onPress={() => cancelProcess()}
          >
            <Text style={styles.btnTxt}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btn, styles.submitBtn]}
            onPress={() => changeVehicleTypeName()}
          >
            <Text style={styles.btnTxt}>Mudar nome</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
