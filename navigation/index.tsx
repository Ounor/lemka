/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {FontAwesome} from '@expo/vector-icons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer, DefaultTheme, DarkTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {ColorSchemeName, Pressable} from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import {RootStackParamList, RootTabParamList} from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import CatalogNavigator from "./Catalog";
import FavoritesNavigator from "./Favorites";
import SettingsNavigator from "./Settings";
import NewChildScreen from "../screens/NewChildScreen";
import ListChildScreen from "../screens/ListChildScreen";

export default function Navigation({colorScheme}: { colorScheme: ColorSchemeName }) {
    return (
        <NavigationContainer
            linking={LinkingConfiguration}
            theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <RootNavigator/>
        </NavigationContainer>
    );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
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

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
    const colorScheme = useColorScheme();

    return (
        <BottomTab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: 'white',
                tabBarInactiveTintColor: 'rgba(255,255,255,0.65)',
                tabBarStyle: {
                    backgroundColor: '#005A3C',
                }
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
                    title: 'Сохраненные',
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
