import React, { useContext } from 'react'
import { Image, StyleSheet, View, Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { HomeScreen } from './screens/HomeScreen'
import { AddNewCarScreen } from './screens/AddNewCarScreen'
import { ChargeScreenNav } from './screens/ChargeScreenNav'
import { HistoryScreen } from './screens/HistoryScreen'
import { StateContext } from './context/StateContext'
import { ErrorMessage } from './components/ErrorMessage'

const Tab = createBottomTabNavigator()

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  NavBar: {
    backgroundColor: '#000807',
    height: 60
  },
  icon: {
    width: 40,
    height: 40
  }
})

export const Tabs = () => {
  const { showError, errorTxt } = useContext(StateContext)
  return (
    <View style={styles.wrapper}>
      <Tab.Navigator
        screenOptions={() => ({
          tabBarShowLabel: false,
          tabBarStyle: styles.NavBar,
          headerShown: false
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused }) => {
              return focused ? (
                <Image
                  source={require('./img/parking-focused.png')}
                  style={styles.icon}
                />
              ) : (
                <Image
                  source={require('./img/parking.png')}
                  style={styles.icon}
                />
              )
            }
          }}
        />
        <Tab.Screen
          name="History"
          component={HistoryScreen}
          options={{
            tabBarIcon: ({ focused }) => {
              return focused ? (
                <Image
                  style={styles.icon}
                  source={require('./img/history-focused.png')}
                />
              ) : (
                <Image
                  style={styles.icon}
                  source={require('./img/history.png')}
                />
              )
            }
          }}
        />

        <Tab.Screen
          name="Add new car"
          component={AddNewCarScreen}
          options={{
            tabBarIcon: ({ focused }) => {
              return focused ? (
                <Image
                  source={require('./img/add-focused.png')}
                  style={styles.icon}
                />
              ) : (
                <Image source={require('./img/add.png')} style={styles.icon} />
              )
            }
          }}
        />
        <Tab.Screen
          name="ChargeNav"
          component={ChargeScreenNav}
          options={{
            tabBarIcon: ({ focused }) => {
              return focused ? (
                <Image
                  source={require('./img/money-focused.png')}
                  style={styles.icon}
                />
              ) : (
                <Image
                  source={require('./img/money.png')}
                  style={styles.icon}
                />
              )
            }
          }}
        />
      </Tab.Navigator>
      {showError && <ErrorMessage message={errorTxt} />}
    </View>
  )
}
