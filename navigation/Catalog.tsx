import React, {createContext, useContext} from 'react'
import {createStackNavigator, Header} from '@react-navigation/stack'
import {
    CatalogContainer,
    CategoryContainer,
    ArticleContainer,
} from '../screens'
import {Image, Pressable, TouchableOpacity, View, Text} from 'react-native'

import {LinearGradient} from 'expo-linear-gradient';
import {FontAwesome} from "@expo/vector-icons";

const Stack = createStackNavigator()

const CatalogNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                options={({navigation}) => ({
                    headerTransparent: true,
                    headerLeftContainerStyle: {marginLeft: 8},
                    title: 'Категории игр',
                    headerTitleStyle: {color: '#fff'},
                    header: () => (
                        <LinearGradient
                            colors={['#094E30', '#00C4F8']}
                            start={{x: 1, y: 0.9}}
                            end={{x: 1, y: 0}}

                            style={{
                                display: 'flex',
                                // flexDirection: 'row',
                                height: 160,
                                alignContent: 'center',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                backgroundColor: 'red',
                                paddingVertical: '10%'
                            }}>
                            <Image resizeMode={'contain'} style={{width: 120, height: 50}} source={require('../assets/images/appLogo.png')}/>
                           <TouchableOpacity
                               onPress={() => navigation.navigate('Modal')}
                               style={{
                               backgroundColor: 'white',
                               borderRadius: 30,
                               width: '90%',
                               height: 40,
                               marginTop: 10,
                               marginHorizontal: 12,
                               paddingHorizontal: 16,
                               paddingVertical: 12,
                               flexDirection: 'row',
                               justifyContent: "flex-start",
                           }}>
                               <FontAwesome style={{marginRight: 32}} name="sliders" size={20} color={'#075131'}/>
                                <Text style={{fontSize: 12}}>Подобрать игру по параметрам</Text>
                           </TouchableOpacity>
                            {/*<Text style={{color: 'white', fontSize: 24, fontWeight: 'bold', marginTop: 12}}>Категории игр*/}

                            {/*</Text>*/}

                        </LinearGradient>
                    ),
                })}
                name="Catalog"
                component={CatalogContainer}
            />
            <Stack.Screen
                options={({navigation}) => ({
                    headerTransparent: true,
                    headerLeftContainerStyle: {marginLeft: 8},
                    headerBackTitleVisible: false,
                    headerTintColor: 'white',
                    title: 'Категории игр',
                    headerRight: () => (
                        <Pressable
                            onPress={() => navigation.navigate('Modal')}
                            style={({pressed}) => ({
                                opacity: pressed ? 0.5 : 1,
                            })}>
                            <FontAwesome
                                name="cog"
                                color={'white'}
                                size={25}
                                style={{marginRight: 15}}
                            />
                        </Pressable>
                    ),
                    headerTitleStyle: {color: '#fff'},
                })}
                name="Category"
                component={CategoryContainer}
            />
            <Stack.Screen
                options={() => ({
                    title: 'Категории игр',
                    headerBackTitleVisible: false,
                    headerTintColor: 'white',
                    headerTransparent: true,
                    headerTitleStyle: {color: '#fff'},
                })}
                name="Article"

                component={ArticleContainer}
            />
        </Stack.Navigator>
    )
}

export default CatalogNavigator
