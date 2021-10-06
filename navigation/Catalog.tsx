import React, {createContext, useContext} from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import {
  CatalogContainer,
  CategoryContainer,
  ArticleContainer,
} from '../screens'
import {Image, Pressable} from 'react-native'

import { LinearGradient } from 'expo-linear-gradient';
import {ReactReduxContext} from "react-redux";
import {FontAwesome} from "@expo/vector-icons";
import Colors from "../constants/Colors";

const Stack = createStackNavigator()


const CatalogNavigator = ({route: {params}}) => {
  return (
    <Stack.Navigator>
        <Stack.Screen
            options={({navigation}) => ({
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
        options={({navigation}) => ({
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
            headerRight: () => (
                <Pressable
                    onPress={() => navigation.navigate('Modal')}
                    style={({ pressed }) => ({
                        opacity: pressed ? 0.5 : 1,
                    })}>
                    <FontAwesome
                        name="cog"
                        color={'white'}
                        size={25}
                        style={{ marginRight: 15 }}
                    />
                </Pressable>
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
