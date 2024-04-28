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
        name="Choose an option for soting the history"
        component={SortOptionsOfHistory}
        options={{
          headerStyle: { backgroundColor: '#000807' },
          headerTintColor: '#B3B7EE'
        }}
      />
    </Stack.Navigator>
  )
}
