import AsyncStorage from '@react-native-async-storage/async-storage'

const setList = async obj => {
  const json = JSON.stringify(obj)
  try {
    await AsyncStorage.setItem('historySortSettings', json)
  } catch (e) {
    return {
      message:
        'Error when trying to set Item at setList at historySortSettingsDb:',
      e
    }
  }
}

const createList = async () => {
  try {
    await setList({ day: true, week: false, month: false })
  } catch (e) {
    return conosle.error('Error at createList at historySortSettingsDb:', e)
  }
}

export const getHistorySortSettings = async () => {
  try {
    const response = await AsyncStorage.getItem('historySortSettings')
    if (!response) {
      await createList()
      const response = await AsyncStorage.getItem('historySortSettings')
      return JSON.parse(response)
    }
    let list = JSON.parse(response)
    return list
  } catch (e) {
    return console.error(
      'Error when trying to fetch list at vehicleTypesDb:',
      e
    )
  }
}

export const setHistorySortSettings = async updatedSortSettings => {
  try {
    const response = await getHistorySortSettings()
    const newList = { ...response, ...updatedSortSettings }
    await setList(newList)
  } catch (e) {
    console.error('Error when updating history sort settings:', e)
  }
}
