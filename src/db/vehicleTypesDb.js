import AsyncStorage from '@react-native-async-storage/async-storage'

const setList = async obj => {
  const json = JSON.stringify(obj)
  try {
    await AsyncStorage.setItem('vehicleTypes', json)
  } catch (e) {
    return {
      message: 'Error when trying to set Item at setList at vehicleTypesDb:',
      e
    }
  }
}

const createList = async () => {
  try {
    await setList({ allTypes: [] })
  } catch (e) {
    return { message: 'Error at createList at vehicleTypesDb:', e }
  }
}

export const getTypes = async () => {
  try {
    const response = await AsyncStorage.getItem('vehicleTypes')
    if (!response) {
      await createList()
      const response = await AsyncStorage.getItem('vehicleTypes')
      return JSON.parse(response)
    }
    let list = JSON.parse(response)
    return list
  } catch (e) {
    return { message: 'Error when trying to fetch list at vehicleTypesDb:', e }
  }
}

export const getType = async type => {
  try {
    const response = await getTypes()
    const typeMatch = response[type]
    return typeMatch
  } catch (e) {
    return { message: 'Error when trying to get a type in getType()', e }
  }
}

const handleAddNewTypeInAllTypesArray = (arr, newType) => {
  let alreadyExists = false
  arr.forEach(type => {
    if (type === newType) alreadyExists = true
  })

  if (alreadyExists) {
    return arr
  } else {
    return [...arr, newType]
  }
}

export const addNewType = async newType => {
  try {
    const list = await getTypes()
    const updatedList = {
      ...list,
      allTypes: handleAddNewTypeInAllTypesArray(list['allTypes'], newType),
      [newType]: {
        name: newType,
        timeCharge: 0,
        minFee: 0,
        firstHourCharge: 0,
        hourCharge: 0
      }
    }
    await setList(updatedList)
  } catch (e) {
    return {
      message: 'Error when trying to add new type at vehicleTypesDb:',
      e
    }
  }
}

export const deleteType = async name => {
  try {
    const oldList = await getTypes()
    const filteredTypes = oldList['allTypes'].filter(type => type !== name)
    if (oldList.hasOwnProperty(name)) {
      delete oldList[name]
    }

    const newList = {
      ...oldList,
      allTypes: filteredTypes
    }
    await setList(newList)
  } catch (e) {
    return { message: 'Error when trying to delete type at vehicleTypesDb:', e }
  }
}

export const updateChargesForType = async (typeName, updatedCharges) => {
  try {
    const list = await getTypes()
    const oldCharges = list[typeName]
    const updatedList = {
      ...list,
      [typeName]: {
        ...oldCharges,
        ...updatedCharges
      }
    }
    await setList(updatedList)
  } catch (e) {
    return {
      message:
        'Error when trying to update charges for type at vehicleTypesDb:',
      e
    }
  }
}

const detachItem = async name => {
  try {
    const list = await getTypes()
    const item = list[name]
    await deleteType(name)
    const filteredList = await getTypes()
    return { filteredList, item }
  } catch (e) {
    return {
      message: 'Error when trying to detatch item at vehicleTypesDb:',
      e
    }
  }
}

export const updateTypeName = async (oldName, newName) => {
  try {
    const { filteredList, item } = await detachItem(oldName)
    const updatedList = {
      ...filteredList,
      allTypes: [...filteredList['allTypes'], newName],
      [newName]: {
        ...item,
        name: newName
      }
    }
    await setList(updatedList)
  } catch (e) {
    return {
      message:
        'Error when trying to update charge type name at vehicleTypesDb:',
      e
    }
  }
}

export const clearTypes = async () => {
  try {
    await AsyncStorage.removeItem('vehicleTypes')
  } catch (e) {
    return { message: 'Error when trying to clear list', e }
  }
}
