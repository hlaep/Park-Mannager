import React, { useEffect, useContext } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { StateContext } from '../../../context/StateContext'
import { setHistorySortSettings } from '../../../db/historySortSettingsDb'

export const SortOptionsOfHistory = () => {
  const { historySortSettings, updateHistorySortSettings } =
    useContext(StateContext)
  useEffect(() => {
    updateHistorySortSettings()
  }, [])

  const updateSettings = async setting => {
    const newSettings = {
      day: setting === 'day',
      week: setting === 'week',
      month: setting === 'month'
    }
    setHistorySortSettings(newSettings)
    try {
      await updateHistorySortSettings()
    } catch (e) {
      console.error('Error when trynig to update history sort settings:', e)
    }
  }

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={() => updateSettings('day')}>
        <View style={styles.option}>
          <Text style={styles.text}>Day</Text>
          <Text style={styles.text}>{historySortSettings['day'] && '☑'}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => updateSettings('week')}>
        <View style={styles.option}>
          <Text style={styles.text}>Week</Text>
          <Text style={styles.text}>{historySortSettings['week'] && '☑'}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => updateSettings('month')}>
        <View style={styles.option}>
          <Text style={styles.text}>Month</Text>
          <Text style={styles.text}>{historySortSettings['month'] && '☑'}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#B3B7EE',
    paddingHorizontal: 8
  },
  option: {
    padding: 8,
    borderBottomWidth: 1,
    borderColor: '#000807',
    justifyContent: 'space-between',
    width: '100%',
    flexDirection: 'row'
  },
  text: {
    fontSize: 22
  }
})
