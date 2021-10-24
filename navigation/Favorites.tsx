import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {
    ArticleContainer,
    FavoritesContainer,
} from '../screens'

const Stack = createStackNavigator()

const FavoritesNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                options={() => ({
                    headerBackTitleVisible: false,
                    headerLeftContainerStyle: {marginLeft: 8},
                    headerTintColor: 'white',
                    title: 'Сохраненное',
                    headerTransparent: true,
                    headerTitleStyle: {color: '#fff'},
                })}
                name="Category"
                component={FavoritesContainer}
            />
            <Stack.Screen
                options={() => ({
                    headerTransparent: true,
                    headerBackTitleVisible: false,
                    headerTintColor: 'white',
                    headerTitleStyle: {color: '#fff'},
                })}
                name="Article"
                component={ArticleContainer}
            />
        </Stack.Navigator>
    )
}

export default FavoritesNavigator
