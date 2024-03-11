import React, {useContext} from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {StateContext} from '../context/StateContext'
import {SelectedChargeScreen} from './SelectedChargeScreen'
import {VehicleTypesScreen} from '../screens/VehicleTypesScreen'

const Stack = createNativeStackNavigator()

export const ChargeScreenNav = () => {
  const {vehicleTypes} = useContext(StateContext)

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="VehicleTypesScreen"
        component={VehicleTypesScreen}
        options={{headerShown: false}}
      />
       {vehicleTypes['allTypes'].map(type => (
        <Stack.Screen
          key={vehicleTypes[type].name}
          name={vehicleTypes[type].name}
          component={SelectedChargeScreen}
          options={{
            headerStyle: {
              backgroundColor: '#000807',
            },
            headerTintColor: 'white',
          }}
        />
      ))} 
    </Stack.Navigator>
  )
}

// In App.js in a new project
