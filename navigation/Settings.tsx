import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {
    SettingsContainer,
} from '../screens/'
import {TouchableOpacity} from 'react-native-ui-lib'
import {Image} from 'react-native'
import {LinearGradient} from 'expo-linear-gradient';

const Stack = createStackNavigator()

const SettingsNavigator = () => {

    return (
        <Stack.Navigator>
            <Stack.Screen
                options={() => ({
                    headerTransparent: true,
                    headerLeftContainerStyle: {marginLeft: 8},
                    title: 'Настройки',
                    headerTitleStyle: {color: '#fff'},
                })}
                name="Settings"
                component={SettingsContainer}
            />
        </Stack.Navigator>
    )
}

export default SettingsNavigator
