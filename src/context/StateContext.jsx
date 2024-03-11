import React, {createContext, useState, useEffect} from 'react'
import {getCars} from '../db/parkingCarsDb'
import {getTypes} from '../db/vehicleTypesDb'

export const StateContext = createContext()

export const StateProvider = ({children}) => {
  const [cars, setCars] = useState([])
  const [vehicleTypes, setVehicleTypes] = useState({})
  const [showError, setShowError] = useState(false)
  const [errorTxt, setErrorTxt] = useState('')

  const updateCars = async () => {
    try {
      const response = await getCars()
      setCars(response.cars)
    } catch (e) {
      displayError(e.message)
    }
  }

  const updateVehicleTypes = async () => {
    try {
      const response = await getTypes()
      setVehicleTypes(response)
    } catch (error) {
      return {message: 'Error getting vehicleTypes', error}
    }
  }

  const displayError = message => {
    setErrorTxt(message)
    setShowError(true)
  }

  return (
    <StateContext.Provider
      value={{
        cars,
        vehicleTypes,
        updateCars,
        updateVehicleTypes,
        showError,
        errorTxt,
        displayError,
        setShowError,
      }}>
      {children}
    </StateContext.Provider>
  )
}
