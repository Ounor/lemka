import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import {
    SettingsContainer,
} from '../screens/'
import { TouchableOpacity } from 'react-native-ui-lib'
import { Image } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';

const Stack = createStackNavigator()

const SettingsNavigator = () => {

  return (
    <Stack.Navigator>
      <Stack.Screen
        options={() => ({
          headerBackTitleVisible: false,
          headerLeftContainerStyle: { marginLeft: 8 },
          headerTintColor: 'white',
          title: 'Настройки',
          headerBackground: () => (
            <LinearGradient
              colors={['#96C2BB', '#6BB3A7']}
              style={{ flex: 1 }}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 0 }}
            />
          ),
          // headerStyle: { paddingHorizontal: 16 },
          headerTitleStyle: { color: '#fff' },
          // headerRight: () => (
          //   <TouchableOpacity style={{ paddingHorizontal: 16 }}>
          //     <Image
          //       style={{ width: 20, height: 20 }}
          //       source={Images.settings}
          //     />
          //   </TouchableOpacity>
          // ),
        })}
        name="Settings"
        component={SettingsContainer}
      />
    </Stack.Navigator>
  )
}

export default SettingsNavigator
