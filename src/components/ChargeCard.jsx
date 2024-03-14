import React, { useState, useContext, useRef, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput
} from 'react-native'
import { ChargeCardStat } from './ChargeCardStat'
import { updateChargesForType } from '../db/vehicleTypesDb'
import { StateContext } from '../context/StateContext'

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#000807',
    marginBottom: 16,
    padding: 16,
    borderRadius: 8
  },
  title: {
    fontSize: 25,
    marginBottom: 8,
    color: '#B3B7EE'
  },
  text: {
    fontSize: 16,
    marginTop: 8,
    color: '#B3B7EE'
  },
  btnWrapper: {
    marginTop: 16,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between'
  },
  editButton: {
    padding: 6,
    backgroundColor: '#45F0DF',
    width: 80,
    alignItems: 'center',
    borderRadius: 8
  },
  cancelBtn: {
    backgroundColor: '#E27373',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    color: '#000807'
  },
  editBtnTxt: {
    fontSize: 18,
    color: '#000807'
  }
})

export const ChargeCard = props => {
  const [showInput, setShowInput] = useState(false)
  const [price, setPrice] = useState('')
  const [displayPrice, setDisplayPrice] = useState(props.charge)
  const { updateVehicleTypes, displayError } = useContext(StateContext)
  const inputRef = useRef(null)

  const handleSubmit = async () => {
    try {
      const parseCharge = parseFloat(price)
      if (isNaN(parseCharge)) return displayError('Preço inválido')

      await updateChargesForType(props.name, {
        [props.chargeParam]: parseFloat(price)
      })
      await updateVehicleTypes()
      setDisplayPrice(price)
      setShowInput(false)
    } catch (e) {
      displayError('Ocorreu um erro ao tentar editar o preço')
      console.error(e)
    }
  }

  useEffect(() => {
    showInput && inputRef.current.focus()
  }, [showInput])

  const handlePriceChange = inputValue => {
    const sanitizedValue = inputValue.replace(/[^0-9.]/g, '')

    const dotCount = sanitizedValue.split('.').length - 1
    if (dotCount <= 1) {
      setPrice(sanitizedValue)
    }
  }
  const handleEdit = () => {
    if (showInput) {
      handleSubmit()
    } else {
      setShowInput(true)
    }
  }

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>{props.title}</Text>
      {!showInput && (
        <ChargeCardStat charge={displayPrice} endText={props.endText} />
      )}

      {showInput && (
        <TextInput
          ref={inputRef}
          keyboardType="numeric"
          placeholder={'Digite o preço'}
          value={price}
          onChangeText={handlePriceChange}
          onSubmitEditing={() => handleSubmit()}
        />
      )}

      <Text style={styles.text}>{props.text}</Text>
      <View style={styles.btnWrapper}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => handleEdit()}
        >
          <Text style={styles.editBtnTxt}>Editar</Text>
        </TouchableOpacity>
        {showInput && (
          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={() => setShowInput(false)}
          >
            <Text style={styles.editBtnTxt}>Cancelar</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}
