import React, {createContext, useContext} from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import {
  CatalogContainer,
  CategoryContainer,
  ArticleContainer,
} from '../screens'
import { TouchableOpacity } from 'react-native-ui-lib'
import { Image } from 'react-native'

import { LinearGradient } from 'expo-linear-gradient';
import {ReactReduxContext} from "react-redux";

const Stack = createStackNavigator()


const CatalogNavigator = ({route: {params}}) => {
  return (
    <Stack.Navigator initialRouteName="Catalog">
        <Stack.Screen
            options={() => ({
                headerBackTitleVisible: false,
                headerLeftContainerStyle: { marginLeft: 8 },
                headerTintColor: 'white',
                title: 'Каталог активностей',
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
            })}
            name="Catalog"
            component={CatalogContainer}
        />
      <Stack.Screen
        options={() => ({
          headerBackTitleVisible: false,
          headerLeftContainerStyle: { marginLeft: 8 },
          headerTintColor: 'white',
          title: 'Каталог активностей',
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
        })}
        name="Category"
        component={CategoryContainer}
      />
      <Stack.Screen
        options={() => ({
          title: 'Каталог активностей',
          headerBackTitleVisible: false,
          headerTintColor: 'white',

          headerBackground: () => (
            <LinearGradient
              colors={['#96C2BB', '#6BB3A7']}
              style={{ flex: 1 }}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 0 }}
            />
          ),
          headerTitleStyle: { color: '#fff' },
        })}
        name="Article"
        component={ArticleContainer}
      />
    </Stack.Navigator>
  )
}

export default CatalogNavigator
