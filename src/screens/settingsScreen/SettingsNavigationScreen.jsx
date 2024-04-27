import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SettingsScreen } from './screens/SettingsScreen'
import { SortOptionsOfHistory } from './screens/SortOptionsOfHistory'

const Stack = createNativeStackNavigator()

export const SettingsNavigationScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="settings screen"
        component={SettingsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="History sort options"
        component={SortOptionsOfHistory}
      />
    </Stack.Navigator>
  )
}
