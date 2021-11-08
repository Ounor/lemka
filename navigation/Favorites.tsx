import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {
    ArticleContainer,
    FavoritesContainer,
} from '../screens'
import {Text, TouchableOpacity, View} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import {FontAwesome} from "@expo/vector-icons";

const Stack = createStackNavigator()

const FavoritesNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                options={({navigation}) => ({
                    headerBackTitleVisible: false,
                    headerLeftContainerStyle: {marginLeft: 8},
                    headerTintColor: 'white',
                    headerTransparent: true,
                    headerTitleStyle: {color: '#fff'},
                    header: ({route}) =>  (<View style={{margin: 16, marginTop: 45, flexDirection: "row", justifyContent: "space-between" }}>
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
                            <TouchableOpacity  style={{marginLeft: 5, margin: -5, width: 30, height: 30, borderRadius: 30, backgroundColor: '#fff'}} onPress={() => navigation.goBack()}>
                                <FontAwesome style={{padding: 5, marginLeft: 5}} name="angle-left" size={20} color={"#075131"}/>
                            </TouchableOpacity>
                            <Text style={{marginLeft: 15, fontSize: 16, color: "#fff", paddingRight: 26}}>
                               Любимые игры
                            </Text>

                        </LinearGradient>
                    </View>),
                })}
                name="Category"
                component={FavoritesContainer}
            />
            <Stack.Screen
                options={({navigation}) => ({
                    headerTransparent: true,
                    headerBackTitleVisible: false,
                    headerTintColor: 'white',
                    headerTitleStyle: {color: '#fff'},
                    header: ({route}) =>  (<View style={{margin: 16, marginTop: 45, flexDirection: "row", justifyContent: "space-between" }}>
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
                            <TouchableOpacity  style={{marginLeft: 5, margin: -5, width: 30, height: 30, borderRadius: 30, backgroundColor: '#fff'}} onPress={() => navigation.goBack()}>
                                <FontAwesome style={{padding: 5, marginLeft: 5}} name="angle-left" size={20} color={"#075131"}/>
                            </TouchableOpacity>
                            <Text style={{marginLeft: 15, fontSize: 16, color: "#fff", paddingRight: 26}}>
                                {route.params?.title}
                            </Text>

                        </LinearGradient>
                    </View>),
                })}
                name="Article"
                component={ArticleContainer}
            />
        </Stack.Navigator>
    )
}

export default FavoritesNavigator
