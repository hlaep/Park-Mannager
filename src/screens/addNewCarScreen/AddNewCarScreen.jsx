import React, { useState, useContext, useEffect } from 'react'
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from 'react-native'
import { VehicleType } from './components/VehicleType.jsx'
import { StateContext } from '../../context/StateContext.jsx'
import { addParkingCar } from '../../db/parkingCarsDb.js'

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#B3B7EE'
  },
  input: {
    borderColor: '#000807',
    borderWidth: 1,
    color: '#000807',
    padding: 8
  },
  text: {
    color: '#000807',
    fontSize: 20
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16
  },
  button: {
    backgroundColor: '#000807',
    color: '#B3B7EE',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6
  },
  buttonText: {
    color: '#B3B7EE',
    fontSize: 20
  },
  typesWrapper: {
    marginVertical: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 10
  }
})

export const AddNewCarScreen = ({ navigation }) => {
  const [sign, setSign] = useState('')
  const [name, setName] = useState('')
  const [selectedType, setSelectedType] = useState(null)
  const { updateCars, displayError, vehicleTypes, updateVehicleTypes } =
    useContext(StateContext)

  const addNewCar = async () => {
    if (sign === '')
      return displayError('O campo de placa não pode estar vazio.')
    if (!selectedType) return displayError('Selecione um tipo de veículo.')

    const newCar = {
      createdAt: Date.now(),
      sign,
      name,
      type: selectedType,
      parking: true
    }

    await addParkingCar(newCar)
    updateCars()
    setName('')
    setSign('')
    navigation.navigate('Home')
  }

  useEffect(() => {
    updateVehicleTypes()
  }, [])

  return (
    <View style={styles.wrapper}>
      <View>
        <Text style={styles.text}>Nome</Text>
        <TextInput value={name} onChangeText={setName} style={styles.input} />
      </View>
      <View>
        <Text style={styles.text}>Placa</Text>
        <TextInput
          value={sign}
          onChangeText={setSign}
          style={styles.input}
          onSubmitEditing={() => addNewCar()}
        />
      </View>
      <View style={styles.typesWrapper}>
        {vehicleTypes['allTypes'].map(type => (
          <VehicleType
            key={vehicleTypes[type].name}
            name={vehicleTypes[type].name}
            selectType={() => setSelectedType(vehicleTypes[type].name)}
            isSelected={selectedType === vehicleTypes[type].name}
          />
        ))}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => addNewCar()}>
          <Text style={styles.buttonText}>Adicionar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
