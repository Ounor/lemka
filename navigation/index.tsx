/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {FontAwesome} from '@expo/vector-icons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {DarkTheme, DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {ColorSchemeName, Text, TouchableOpacity} from 'react-native';

import ModalScreen from '../screens/ModalScreen';
import {RootStackParamList, RootTabParamList} from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import CatalogNavigator from "./Catalog";
import FavoritesNavigator from "./Favorites";
import SettingsNavigator from "./Settings";
import NewChildScreen from "../screens/NewChildScreen";
import ListChildScreen from "../screens/ListChildScreen";
import {LinearGradient} from "expo-linear-gradient";

export default function Navigation({colorScheme}: { colorScheme: ColorSchemeName }) {
    return (
        <NavigationContainer
            linking={LinkingConfiguration}
            theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <RootNavigator/>
        </NavigationContainer>
    );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Root" component={BottomTabNavigator} options={{headerShown: false}}/>
            <Stack.Group screenOptions={{presentation: 'modal'}}>
                <Stack.Screen name="Modal" options={{
                    title: 'Фильтры',
                    headerTransparent: true,
                    headerTitleStyle: {color: '#fff'},

                }} component={ModalScreen}/>
                <Stack.Screen name="AddChild" options={{
                    headerTransparent: true,
                    headerTitleStyle: {color: '#fff'}, title: 'Добавить ребенка'
                }} component={NewChildScreen}/>
                <Stack.Screen name="RemoveChild" options={{
                    headerTransparent: true,
                    headerTitleStyle: {color: '#fff'}, title: 'Редактировать список'
                }} component={ListChildScreen}/>
            </Stack.Group>
        </Stack.Navigator>
    );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
    return (
        <BottomTab.Navigator
            tabBar={({state, descriptors, navigation}) => {

                const FocusedGradient = ['#032516', '#054429'];
                const NotFocusedGradient = ['#042B1A', '#075935'];

                const focusedOptions = descriptors[state.routes[state.index].key].options;

                if (focusedOptions.tabBarVisible === false) {
                    return null;
                }

                return <LinearGradient style={{height: 80, flexDirection: "row"}} colors={['#042B1A', '#075935']}
                                       start={[0, 0]} end={[0, 1]}>
                    {state.routes.map((route, index) => {
                        const {options} = descriptors[route.key];
                        const label =
                            options.tabBarLabel !== undefined
                                ? options.tabBarLabel
                                : options.title !== undefined
                                    ? options.title
                                    : route.name;

                        const isFocused = state.index === index;

                        const onPress = () => {
                            const event = navigation.emit({
                                type: 'tabPress',
                                target: route.key,
                                canPreventDefault: true,
                            });

                            if (!isFocused && !event.defaultPrevented) {
                                navigation.navigate(route.name);
                            }
                        };

                        const onLongPress = () => {
                            navigation.emit({
                                type: 'tabLongPress',
                                target: route.key,
                            });
                        };

                        return (
                            <TouchableOpacity
                                key={index}
                                accessibilityRole="button"
                                accessibilityState={isFocused ? {selected: true} : {}}
                                accessibilityLabel={options.tabBarAccessibilityLabel}
                                testID={options.tabBarTestID}
                                onPress={onPress}
                                onLongPress={onLongPress}
                                style={{
                                    flex: 1,
                                }}>
                                <LinearGradient
                                    colors={isFocused ? FocusedGradient : NotFocusedGradient}
                                    style={{
                                        width: '100%',
                                        height: 90,
                                        alignItems: 'center',
                                        justifyContent: 'space-around',
                                        paddingBottom: 20,
                                        backgroundColor: isFocused ? 'dodgerblue' : 'white',
                                    }}>
                                    {
                                        options.title === 'Каталог'
                                            ? <TabBarIcon name="book" color={'white'}/>
                                            : options.title === 'Любимые игры'
                                                ? <TabBarIcon name="heart" color={'white'}/>
                                                : <TabBarIcon name="cog" color={'white'}/>
                                    }
                                    <Text style={{color: 'white'}}>
                                        {label}
                                    </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        );
                    })}
                </LinearGradient>
            }
            }
            screenOptions={{
                headerShown: false,
                lazy: true,
                tabBarActiveTintColor: 'white',
                tabBarInactiveTintColor: 'rgba(255,255,255,0.65)',
                tabBarStyle: {
                    backgroundColor: '#005A3C',
                },
            }}>
            <BottomTab.Screen
                name="CatalogTab"
                component={CatalogNavigator}
                options={() => ({
                    title: 'Каталог',
                    tabBarIcon: ({color}) => <TabBarIcon name="book" color={color}/>,

                })}
            />
            <BottomTab.Screen
                name="Favorites"
                component={FavoritesNavigator}
                options={{
                    title: 'Любимые игры',
                    tabBarIcon: ({color}) => <TabBarIcon name="heart" color={color}/>,
                }}
            />
            <BottomTab.Screen
                name="SettingsTab"
                component={SettingsNavigator}
                options={{
                    title: 'Настройки',
                    tabBarIcon: ({color}) => <TabBarIcon name="cog" color={color}/>,
                }}
            />
        </BottomTab.Navigator>
    );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
}) {
    return <FontAwesome size={30} style={{marginBottom: -3}} {...props} />;
}
