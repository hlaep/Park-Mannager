import React, { createContext, useState, useEffect } from 'react'
import { getCars } from '../db/parkingCarsDb'
import { getTypes } from '../db/vehicleTypesDb'
import { getHistorySortSettings } from '../db/historySortSettingsDb'

export const StateContext = createContext()

export const StateProvider = ({ children }) => {
  const [cars, setCars] = useState([])
  const [vehicleTypes, setVehicleTypes] = useState({})
  const [historySortSettings, setHistorySortSettings] = useState({})
  const [showError, setShowError] = useState(false)
  const [errorTxt, setErrorTxt] = useState('')

  const updateCars = async () => {
    try {
      const response = await getCars()
      setCars(response.cars)
    } catch (e) {
      console.error('Error getting cars:', e)
    }
  }

  const updateVehicleTypes = async () => {
    try {
      const response = await getTypes()
      setVehicleTypes(response)
    } catch (e) {
      console.error('Error getting vehicleTypes:', e)
    }
  }

  const updateHistorySortSettings = async () => {
    try {
      const response = await getHistorySortSettings()
      setHistorySortSettings(response)
    } catch (e) {
      console.error('Error getting history sort settings:', e)
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
        updateHistorySortSettings,
        historySortSettings
      }}
    >
      {children}
    </StateContext.Provider>
  )
}
