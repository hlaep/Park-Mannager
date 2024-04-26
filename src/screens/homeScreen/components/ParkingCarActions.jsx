import React, { useState, useEffect, useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { getType } from '../../../db/vehicleTypesDb'
import { deleteParkingCar, updateParking } from '../../../db/parkingCarsDb'
import { StateContext } from '../../../context/StateContext'

export const ParkingCarActions = props => {
  const [price, setPrice] = useState(0)
  const [currentTime, setCurrentTime] = useState(Date.now() - props.createdAt)
  const [charges, setCharges] = useState(null)
  const { vehicleTypes, updateCars, displayError } = useContext(StateContext)

  const finishParking = async () => {
    try {
      await updateParking(
        props.id,
        formatPrice(price),
        formatTime(currentTime),
        price
      )
      await updateCars()
    } catch (e) {
      console.error(e.message, e.e)
      displayError('Erro ao tentar terminar de estacionar')
    }
  }

  const handleDelete = async () => {
    try {
      await deleteParkingCar(props.id)
      updateCars()
    } catch (e) {
      console.error(e.message, e.e)
    }
  }

  const getHourPrice = () => {
    const hours = parseInt(currentTime / 1000 / 3600)
    if (hours === 1) {
      return charges.firstHourCharge
    } else if (hours > 1) {
      return charges.firstHourCharge + (hours - 1) * charges.hourCharge
    }
    return 0
  }

  const getPrice = () => {
    const currentChargeTime = Date.now() - props.createdAt
    const chargePerTime = (charges.timeCharge / 1000 / 3600) * currentChargeTime
    const totalCharge = chargePerTime + getHourPrice()
    if (totalCharge < charges.minFee) {
      setPrice(charges.minFee.toFixed(2))
    } else {
      setPrice(totalCharge.toFixed(2))
    }
  }

  const formatPrice = price =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)

  const formatTime = time => {
    const timeToSec = time / 1000
    const timeD = timeToSec / 86400
    const timeH = (timeToSec % 86400) / 3600
    const timeM = ((timeToSec % 86400) % 3600) / 60
    const timeS = ((timeToSec % 86400) % 3600) % 60

    let formatedTime = ''
    if (timeD >= 1) formatedTime += `${parseInt(timeD)}d`
    if (timeH >= 1) formatedTime += `${parseInt(timeH)}h `
    if (timeM >= 1 && timeD < 1) formatedTime += `${parseInt(timeM)}m `
    if (timeS >= 1 && timeH < 1 && timeD < 1)
      formatedTime += `${parseInt(timeS)}s`
    if (timeS >= 1 && timeH < 1 && timeM < 1 && timeD < 1)
      formatedTime = `${parseInt(timeS)}s`

    return formatedTime
  }

  const getCharges = async () => {
    try {
      const response = await getType(props.type)
      setCharges(response)
    } catch (e) {
      console.error(e.message)
    }
  }

  useEffect(() => {
    if (!charges) getCharges()
    const intervalId = setInterval(() => {
      setCurrentTime(Date.now() - props.createdAt)
      if (charges) getPrice()
    }, 1000)

    return () => clearInterval(intervalId)
  }, [charges, vehicleTypes])

  useEffect(() => {
    getCharges()
  }, [vehicleTypes])

  return (
    <View style={styles.wrapper}>
      <View style={styles.stats}>
        <Text style={styles.text}>{formatPrice(price)}</Text>
        <Text style={styles.text}>{formatTime(currentTime)}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => handleDelete()}>
          <Image source={require('../img/delete.png')} style={styles.img} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => finishParking()}>
          <Image
            source={require('../img/finish-parking.png')}
            style={styles.img}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'space-between'
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  text: {
    fontSize: 16,
    color: 'black',
    textTransform: 'capitalize'
  },
  img: {
    height: 30,
    width: 30
  }
})
