import AsyncStorage from '@react-native-async-storage/async-storage'

const setList = async obj => {
  const json = JSON.stringify(obj)
  try {
    await AsyncStorage.setItem('cars', json)
  } catch (e) {
    return
    {
      message: 'Error when trying to set Item at setList at parkingCarsDb: ', e
    }
  }
}

export const clearParkingCars = async () => {
  try {
    await AsyncStorage.removeItem('cars')
  } catch (e) {
    return {message: 'Error when trying to clear list', e}
  }
}

const createList = async () => {
  try {
    await setList({cars: []})
  } catch (e) {
    return {message: 'Error at createList at parkingCarsDb', e}
  }
}

export const getCars = async () => {
  try {
    const response = await AsyncStorage.getItem('cars')
    if (!response || response.length === 0) await createList()
    const data = JSON.parse(response)
    return data
  } catch (e) {
    return {message: `Error at getList at parkingCarsDb: `, e}
  }
}

const uniqueId = () =>
  Math.random().toString(36).substring(2) + Date.now().toString(36)

export const addParkingCar = async item => {
  const newItem = {
    ...item,
    id: uniqueId(),
  }

  try {
    const response = await getCars()
    listArr = response['cars']

    const newList = {
      cars: [...listArr, newItem],
    }

    await setList(newList)
  } catch (e) {
    return {
      message: `Error when adding item "${item}" at addParkingCar at parkingCarsDb`,
      e,
    }
  }
}

export const deleteParkingCar = async itemId => {
  try {
    const response = await getCars()
    listArr = response['cars']

    const newArr = listArr.filter(item => item.id !== itemId)
    const newList = {
      cars: newArr,
    }

    await setList(newList)
  } catch (e) {
    return {
      message: `Error deleting item : "${itemId}" at deleteParkingCar at parkingCarsDb: `,
      e,
    }
  }
}

const getYesterdayOfDate = date => {
  const currentTimestamp = date
  const oneDayMilliseconds = 24 * 60 * 60 * 1000
  const dayBeforeTimestamp = currentTimestamp - oneDayMilliseconds
  return dayBeforeTimestamp
}

export const updateParking = async (id, price, time) => {
  try {
    const response = await getCars()
    const filteredList = response.cars.filter(car => car.id !== id)
    const car = response.cars.find(car => car.id === id)
    const updatedList = {
      cars: [
        ...filteredList,
        {
          ...car,
          parking: false,
          price,
          time,
          exitTime: Date.now(),
        },
      ],
    }
    setList(updatedList)
  } catch (e) {
    return {message: 'Error when trying to update parking: ', e}
  }
}

export const clearHistory = async () => {
  try {
    const response = await getCars()
    const filteredArr = response.cars.filter(car => car.parking === true)
  } catch (e) {
    return {message: 'Erro when Trying to clear history', e}
  }
}
