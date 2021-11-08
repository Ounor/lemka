import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {ArticleContainer, CatalogContainer, CategoryContainer,} from '../screens'
import {Image, Pressable, Text, TouchableOpacity, View} from 'react-native'

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
                            <Image resizeMode={'contain'} style={{width: 120, height: 50}}
                                   source={require('../assets/images/appLogo.png')}/>
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
                    header: ({route}) => (<View
                        style={{margin: 16, marginTop: 45, flexDirection: "row", justifyContent: "space-between"}}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <LinearGradient
                                colors={['#042B1A', '#075935']}
                                start={{x: 1, y: 0.9}}
                                end={{x: 1, y: 0}}
                                style={{
                                    opacity: .8,
                                    display: 'flex',
                                    flexDirection: 'row',
                                    borderRadius: 20,
                                    padding: 12,
                                    height: 45,
                                    alignContent: 'center',
                                    justifyContent: 'flex-start',
                                    alignSelf: 'flex-start',
                                }}>
                                <TouchableOpacity style={{
                                    marginLeft: 5,
                                    margin: -5,
                                    width: 30,
                                    height: 30,
                                    borderRadius: 30,
                                    backgroundColor: '#fff'
                                }} onPress={() => navigation.goBack()}>
                                    <FontAwesome style={{padding: 5, marginLeft: 5}} name="angle-left" size={20}
                                                 color={"#075131"}/>
                                </TouchableOpacity>
                                <Text style={{marginLeft: 15, fontSize: 16, color: "#fff", paddingRight: 26}}>
                                    {route.params?.title}
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            marginLeft: 5,
                            marginTop: 2,
                            width: 42,
                            height: 42,
                            borderRadius: 30,
                            backgroundColor: '#075131'
                        }} onPress={() => navigation.setParams({sort: !route.params.sort})}>
                            <FontAwesome style={{paddingTop: 10, marginLeft: 10}} name="sort-amount-asc" size={20}
                                         color={"#fff"}/>
                        </TouchableOpacity>
                    </View>),
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
                options={({navigation}) => ({
                    title: 'Категории игр',
                    headerBackTitleVisible: false,
                    headerTintColor: 'white',
                    headerTransparent: true,
                    headerTitleStyle: {color: '#fff'},
                    header: ({route}) => (<View
                        style={{margin: 16, marginTop: 45, flexDirection: "row", justifyContent: "space-between"}}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <LinearGradient
                                colors={['#042B1A', '#075935']}
                                start={{x: 1, y: 0.9}}
                                end={{x: 1, y: 0}}
                                style={{
                                    opacity: .8,
                                    display: 'flex',
                                    flexDirection: 'row',
                                    borderRadius: 20,
                                    padding: 12,
                                    height: 45,
                                    alignContent: 'center',
                                    justifyContent: 'flex-start',
                                    alignSelf: 'flex-start',
                                }}>
                                <TouchableOpacity style={{
                                    marginLeft: 5,
                                    margin: -5,
                                    width: 30,
                                    height: 30,
                                    borderRadius: 30,
                                    backgroundColor: '#fff'
                                }} onPress={() => navigation.goBack()}>
                                    <FontAwesome style={{padding: 5, marginLeft: 5}} name="angle-left" size={20}
                                                 color={"#075131"}/>
                                </TouchableOpacity>
                                <Text style={{marginLeft: 15, fontSize: 16, color: "#fff", paddingRight: 26}}>
                                    {route.params?.title}
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>),
                })}
                name="Article"
                component={ArticleContainer}
            />
        </Stack.Navigator>
    )
}

export default CatalogNavigator
